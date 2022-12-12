import express, { Request, Response } from 'express'
import productRoutes from './handlers/product'
export const app: express.Application = express()
const address: string = "0.0.0.0:3000"
import prouter  from './routes/product' ;
import urouter from './routes/user'
import orouter from './routes/orders';
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.use('/products',prouter);
app.use('/users',urouter);
app.use('/orders',orouter);
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app ;