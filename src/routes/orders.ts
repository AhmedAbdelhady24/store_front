import express from 'express';
import OrdersHandler from '../handlers/order';
import verifyAuthToken from '../middlewares/authorization';

const orouter = express.Router();
const handler = new OrdersHandler();

orouter.get('/',verifyAuthToken, handler.index)
orouter.get('/:id',verifyAuthToken, handler.show)
orouter.post('/',verifyAuthToken, handler.create)
// add product
orouter.post('/:id',verifyAuthToken, handler.addProduct)
export default orouter;
