import express from 'express'

import classesController from './database/controllers/classes'
import totalController from './database/controllers/total'

const routes = express.Router()

const classesControl = new classesController()
const totalControl = new totalController()

routes.get('/classes', classesControl.index)
routes.post('/classes', classesControl.create)

routes.get('/connections', totalControl.index)
routes.post('/connections', totalControl.create)


export default routes
