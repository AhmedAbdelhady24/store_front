import { UserStore,User } from "../models/user";
import OrderStore from "../models/orders";
const store = new UserStore();
const ostore = new OrderStore();

import { ProductStore } from "../models/product";
import bcrypt from 'bcrypt';
import supertest from "supertest";
import app from "../server";
const request  = supertest(app);
const pstore = new ProductStore();

import jwt from 'jsonwebtoken';
const pepper: string = process.env.BCRYPT_PASSWORD as string ;

const Srounds: number = Number(process.env.SALT_ROUNDS as string)
const hash = bcrypt.hashSync(
    "1234567890"+ pepper,
    Srounds
) ;
const userData= {
  username: "ahmedabdelhady2406",
  first_name: "ahmed",
  last_name: "abdelhady",
  password_digest: hash

}
const token = jwt.sign({ username: userData.username,password:userData.password_digest}, process.env.TOKEN_SECRET as string);
describe("User Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });


    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
    
  
      it('create method should add a User', async () => {
       
        const result = await store.create({
           
            username: "ahmedabdelhady2406",
            first_name: "ahmed",
            last_name: "abdelhady",
            password_digest: hash
          
        });
        expect(result).toEqual({
            id: 1,
            username: "ahmedabdelhady2406",
            first_name: "ahmed",
            last_name: "abdelhady",
            password_digest: hash
        });
      });
    
      it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            username: "ahmedabdelhady2406",
            first_name: "ahmed",
            last_name: "abdelhady",
            password_digest: hash
        }]);
      });
    
      it('show method should return the correct User', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            username: "ahmedabdelhady2406",
            first_name: "ahmed",
            last_name: "abdelhady",
            password_digest: hash
        });
      });
    
    });

describe('User endpoint ' , () => {
      beforeAll(async()=>{
        const user = await store.create(userData);
        
        
      })
      
      it('to create new user',()=>{const data = {
        username: "ahmedabdelhady2406",
          first_name: "ahmed",
          last_name: "abdelhady",
          password_digest: hash
      }
      request.post('/users').send(data).expect(201);
      }) ;
      it('to get all users', async () => {
        const response = await request.get('/users').set('Cookie', [`x-access-token=${token}`
        ]);
      
        console.log(request);
        
        expect(response.status).toBe(200);
    } );
      
      it('show new product',async()=>{
        const response = await request.get('/users/1').set('Cookie', [`x-access-token=${token}`]);
        expect(response.status).toBe(200);
      })
  



});

describe("Product Model", () => {
    it('should have an index method', () => {
      expect(pstore.index).toBeDefined();
    });


    it('should have a show method', () => {
        expect(pstore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(pstore.create).toBeDefined();
      });
    
    
      it('should have a delete method', () => {
        expect(pstore.delete).toBeDefined();
      });
    
      it('create method should add a Product', async () => {
        const result = await pstore.create({
          name: 'product1',
          price: 250,
        });
        expect(result).toEqual({
          id: 1,
          name: 'product1',
          price: 250,
        });
      });
    
      it('index method should return a list of Products', async () => {
        const result = await pstore.index();
        expect(result).toEqual([{
          id: 1,
          name: 'product1',
          price: 250,
        }]);
      });
    
      it('show method should return the correct Product', async () => {
        const result = await pstore.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'product1',
            price: 250,
        });
      });
      
     
    });

describe('products endpoint ' , () => {
     
       
      
      it('to create new product',()=>{const data = {
        name: 'product1',
        price: 500
      }
      request.post('/products').send(data).expect(201);
      }) ;
      it('to get all products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    } );
      
      it('show new product',async()=>{
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
      })
  



});

describe("order Model", () => {

    it('should have an index method', () => {
      expect(ostore.index).toBeDefined();
    });


    it('should have a show method', () => {
        expect(ostore.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(ostore.create).toBeDefined();
      });
    
    
      it('should have a delete method', () => {
        expect(ostore.delete).toBeDefined();
      });
      
      it('create method should add a order', async () => {
        
        const result = await ostore.create({
          user_id: 1,
          status:'open',
        });
        expect(result).toEqual({
            id:1,
            status:'open',
            user_id: 1
        });
      });
      it('add product method should add product to the correct order', async () => {
        const result = await ostore.addProduct(4,1,1);
        expect(result).toEqual({
            id: 1,
            quantity: 4,
             order_id: 1,
             product_id: 1
        });
      });
      it('index method should return a list of orders', async () => {
        const result = await ostore.index();
        expect(result).toEqual([{ id: 1,
          quantity: 4,
           order_id: 1,
           product_id: 1}]);
      });
    
      
    


      it('show method should return the correct order', async () => {
        const result = await ostore.show(1);
        expect(result).toEqual({
            id: 1,
            quantity: 4,
             order_id: 1,
             product_id: 1
        });
      });
});

describe('orders endpoint ' , () => {
    
    it('to get all orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    } )
    it('to create new order',()=>{const data = {
      user_id: 1,
      status:'open'
    }
    request.post('/orders').send(data).expect(201);
    })
    it('add product to new order',()=>{const data = {
      productId: 1,
      quantity:4
    }
    request.post('/orders/1').send(data).expect(201);
    })
    it('show new order',async()=>{
      const response = await request.get('/orders/1');
      expect(response.status).toBe(200);
    })




});