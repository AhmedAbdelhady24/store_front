import express ,{ Request,Response } from "express";
import { ProductStore,Product } from "../models/product";
const store = new ProductStore();


export class ProductsHandler{
async index(_req:Request,res:Response){
try {
    const products =await store.index();
res.json(products);
} catch (error) {
    res.status(401)
            res.json({ error })
}



}
async show(req: Request, res: Response){
    try {
        const product = await store.show(req.params['id'])
    
    
    res.json(product)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
    
 }
 async create(req: Request, res: Response){
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
        }
       
        
        const newproduct = await store.create(product)
        res.json(newproduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

async delete(req: Request, res: Response){
    try {
        const deleted = await store.delete(req.body.id)
        const products =await store.index();
        res.json(products);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
   

    
}
}


export default ProductsHandler ;