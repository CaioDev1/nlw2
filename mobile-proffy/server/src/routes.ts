import express from 'express'
import classesController from './controllers/classesController'
import connectionController from './controllers/connectionController'

const routes = express.Router()

const classesControllers = new classesController()
const connectionControllers = new connectionController()

routes.get('/classes', classesControllers.index)
routes.post('/classes', classesControllers.create)

routes.get('/connections', connectionControllers.index)
routes.post('/connections', connectionControllers.create)


export default routes