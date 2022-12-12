
import express ,{ Request,Response } from "express";
import bcrypt from 'bcrypt';
import { User,UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
const store = new UserStore();
const pepper: string = process.env.BCRYPT_PASSWORD as string ;

const Srounds: number = Number(process.env.SALT_ROUNDS as string)



export class UsersHandler{
    async index(_req:Request,res:Response){
    try {
        const users =await store.index();
        res.json(users);
        
    } catch (error) {
        res.status(400)
            res.json(error);
    }
   
    
    
    }
    async show(req: Request, res: Response){
        try {
            const user = await store.show(req.params['id'])
            res.json(user)
        } catch (error) {
            res.status(400)
            res.json(error);
        }
        
        
        
        
     }
     async create(req: Request, res: Response){
        const hash = bcrypt.hashSync(
            req.body.password + pepper,
            Srounds
        ) ;
        const user: User = {
            username: req.body.username,
            first_name: req.body.first_name ,
            last_name: req.body.last_name ,
            password_digest: hash
        }
        try {
            
            const newuser = await store.create(user)
            
            const token = jwt.sign({ username: user.username,password:user.password_digest}, process.env.TOKEN_SECRET as string);
            let options = {
            path:"/",
            maxAge: 1000 * 60 * 60 * 24, 
            httpOnly: true, }
    
            res.cookie('x-access-token',token, options) 
            
            res.status(201)
            res.json(newuser)
        } catch(err) {
            res.status(400)
            res.json(err as string+ user)
        }
    }
    async authenticate(req: Request, res: Response){
        const hash = bcrypt.hashSync(
            req.body.password + pepper,
            Srounds
        ) ;
        const user: User = {
            username: req.body.username,
            password_digest: hash
            
        }
        try {
        const u = await store.authenticate(req.body.username,req.body.password) ;
        const token = jwt.sign({ username: user.username,password:user.password_digest}, process.env.TOKEN_SECRET as string);
        let options = {
            path:"/",
            maxAge: 1000 * 60 * 60 * 24, 
            httpOnly: true, }
    
        res.cookie('x-access-token',token, options) 
        
        
        
        
        res.json(token);
        
        } catch (error) {
            res.status(401)
            res.json({ error })
        }
        
     }
 
    }
    
    
    export default UsersHandler ;
    
    
 