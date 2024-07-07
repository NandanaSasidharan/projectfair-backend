//import express
const express = require('express')
const userController = require("../Controllers/userController")
const  projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
//creatte a router object of express to define routes(path)
const router = new express.Router()

//using router object to define paths
 
//Register API routes-localhos:4000/register
router.post('/register',userController.register)

//login API routes-localhos:4000/register
router.post('/login',userController.login)

//add user project api router-localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//get user project api routes-localhost:4000/projects/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)
//get all projects routes-localhost:4000/projects/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)
//get home page routes-localhost:4000/projects/home-projects
router.get('/project/home-projects',projectController.getHomeProject)
module.exports = router
//update project routes- localhost:4000/projects/update-project/34677788899
router.put('/project/update-projects/:id',jwtMiddleware,multerConfig.single('projectImage'),
projectController.editProject)
//delert
router.delete('/project/delete-projects/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router