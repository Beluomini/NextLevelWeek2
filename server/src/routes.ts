import express from 'express';
import ClassControler from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassControler();
const connectionsControler = new ConnectionController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsControler.create);
routes.get('/connections', connectionsControler.index);

export default routes;