import express from 'express';
import ProductsHandler from '../handlers/product';
import verifyAuthToken from '../middlewares/authorization';

const prouter = express.Router();
const handler = new ProductsHandler();
prouter.get('/',handler.index);
prouter.post('/',verifyAuthToken, handler.create);
prouter.delete('/',verifyAuthToken, handler.delete);
prouter.get('/:id', handler.show);
export default prouter;
