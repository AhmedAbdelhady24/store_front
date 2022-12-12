import express ,{ Request,Response } from "express";
import {OrderStore,Order} from "../models/orders";
const store = new OrderStore();


export class OrdersHandler{
async index(_req:Request,res:Response){
try {
  const orders =await store.index();
res.json(orders);
} catch (error) {
  res.status(400)
        res.json(error)
}



}
async show(req: Request, res: Response){
  try {
    const order = await store.show(Number(req.params['id']))
    
    
    res.json(order)
  } catch (error) {
    res.status(400)
        res.json(error)
  }
    
 }
 async create(req: Request, res: Response){
    try {
        const order: Order = {
            user_id: parseInt(req.body.user_id),
            status: req.body.status,
        }
       
        
        const newOrder = await store.create(order)
        res.status(201)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

async delete(req: Request, res: Response){
  try {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
  } catch (error) {
    res.status(400)
        res.json(error)
  }
    
}

 async addProduct(_req: Request, res: Response){
  
  
    const orderId: Number = Number(_req.params.id)
    const productId: Number = Number(_req.body.productId)
    const quantity: number = parseInt(_req.body.quantity)
    
    try {
      
      
      const addedProduct = await store.addProduct(quantity, orderId, productId)
      console.log(addedProduct);
      res.status(201)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 
  


}



export default OrdersHandler ;