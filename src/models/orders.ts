import client from "../database";

export type Order={
    id?: Number;
    user_id: Number;
    status: string;
}
export type Product_Order={
  
    id?: Number,
    quantity: Number,
    order_id: Number,
    product_id: Number

}



export class OrderStore{



async index(): Promise<Product_Order[]>{
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM order_products';
        
        const result = await conn.query(sql);
        
        console.log("index good");
        
        conn.release()
        console.log(result.rows);
        
        return result.rows

    } catch (error) {
        throw new Error(`cant retrieve all orders .ERROR: ${error}`);
    }
}

async show(id: Number):Promise<Product_Order>{
    try {
        const conn= await client.connect();
        const sql = 'SELECT * FROM order_products WHERE order_id=($1)'
        const result = await conn.query(sql,[id]) ;
        console.log(`show method for id ${typeof id} ${result.rows[0]}`);
        
        return result.rows[0]
    } catch (error) {
        throw new Error(`cant find  order with id = ${id} .ERROR: ${error}`);
    
    }
}
async create(o: Order): Promise<Order> {
    try {
 
 
  const conn = await client.connect()
  
  console.log(o);
  
  const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
  
  const result = await conn.query(sql, [o.user_id, o.status]);
  
    console.log("create good");
  
  
  conn.release()

  return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
    }
}
async delete(id: Number): Promise<Order> {
    try {
  const sql = 'DELETE FROM order_products WHERE id=($1)'
 
  const conn = await client.connect()

  const result = await conn.query(sql, [id])


  conn.release()

  return result.rows[0]
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
}
async addProduct(quantity: Number, orderId: Number, productId: Number): Promise<Product_Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "open") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
    
      
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()
      
      conn.release()
      const result = await conn
          .query(sql, [quantity, orderId, productId])
     
          const order = result.rows[0]
      
      
     
      
      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}
export default OrderStore;