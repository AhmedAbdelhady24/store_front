import express from 'express';
import UsersHandler from '../handlers/user';
import verifyAuthToken from '../middlewares/authorization';
const urouter = express.Router();
const handler = new UsersHandler();
urouter.get('/',verifyAuthToken,handler.index);
urouter.post('/',handler.create);
urouter.post('/login',handler.authenticate);


urouter.get('/:id',verifyAuthToken, handler.show);
export default urouter;
