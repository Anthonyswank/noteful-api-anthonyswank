const express = require( 'express' )
const path = require( 'path' )
const FolderService = require( './folder-service' )
const logger = require( '../logger' )

const folderRouter = express.Router()
const jsonParser = express.json()

folderRouter

  .route( '/' )

  .get( ( req, res, next ) => {
    const knexInstance = req.app.get( 'db' )
    FolderService.getAllFolders( knexInstance )
      .then(folders => {
        res.json( folders )
      } )
      .catch( next )
  } )

  .post( jsonParser, ( req, res, next ) => {
    const { name : newFolderName } = req.body
    FolderService.insertFolder(
      req.app.get( 'db' ),
      newFolderName
    )
      .then(folder => {
        res
          .status( 201 )
          .location( path.posix.join( req.originalUrl, `/${folder.id}` ) )
          .json( folder )
      } )
      .catch( next )
  } )

folderRouter

  .route( '/:folderid' )

  .all( ( req, res, next ) => {
    FolderService.getFolderById(
      req.app.get( 'db' ),
      req.params.folderid
    )
      .then(folder => {
        if ( !folder ) {
          logger.error( `Folder with id ${req.params.folderid} not found` )
          return res.status( 404 ).json( {
            error : { message : 'Folder not found.' }
          } )
        }
        res.folder = folder
        next()
      } )
      .catch( next )
  } )

  .get( ( req, res, next ) => {
    res.json(res.folder)
  })
  
  .patch( jsonParser, ( req, res, next ) => {
    const { name : newFolderName } = req.body
   
    FolderService.updateFolderName(
      req.app.get( 'db' ),
      req.params.folderid,
      newFolderName
    )
      .then( ( updatedFolder ) => {
        res
          .status( 200 )
          .json( updatedFolder )

      } )
      .catch( next )
  } )
    
  .delete( ( req, res, next ) => {
    FolderService.deleteFolder(
      req.app.get( 'db' ),
      req.params.folderid
    )
      .then( ( numRowsAffected ) => {
        res
          .status( 204 )
          .end()
      } )
      .catch( next )
  } )
    
module.exports = folderRouter
