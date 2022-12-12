import client from "../database";

export type Product={
    id?: Number;
    name: string;
    price: Number;
}


export class ProductStore{



async index(): Promise<Product[]>{
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM products';
        
        const result = await conn.query(sql);
        
        console.log("index good");
        
        conn.release()
        return result.rows

    } catch (error) {
        throw new Error(`cant retrieve all products .ERROR: ${error}`);
    }
}

async show(id: string):Promise<Product>{
    try {
        const conn= await client.connect();
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const result = await conn.query(sql,[id]) ;
        return result.rows[0]
    } catch (error) {
        throw new Error(`cant find  product with id = ${id} .ERROR: ${error}`);
    
    }
}
async create(p: Product): Promise<Product> {
    try {
 
 
  const conn = await client.connect()
  
  console.log(p);
  const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
  
  const result = await conn.query(sql, [p.name, p.price]);
  console.log(result);
  
    console.log("create good");
  console.log(result);
  
  conn.release()

  return result.rows[0]
    } catch (err) {
        throw new Error(`Could not add new Product ${p.name}. Error: ${err}`)
    }
}
async delete(id: string): Promise<Product> {
    try {
  const sql = 'DELETE FROM products WHERE id=($1)'
 
  const conn = await client.connect()

  const result = await conn.query(sql, [parseInt(id)])


  conn.release()

  return result.rows[0]
    } catch (err) {
        throw new Error(`Could not delete Product ${id}. Error: ${err}`)
    }
}

}