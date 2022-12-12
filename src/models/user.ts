import client from "../database";
import bcrypt from 'bcrypt';
const pepper: string = process.env.BCRYPT_PASSWORD as string ;
export type User={
    id?: Number;
    username: string ;
    first_name?: string ;
    last_name?: string ;
    password_digest?: string ;
    token?:string;
    
}

export class UserStore{
    async index(): Promise<User[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            
            const result = await conn.query(sql);
            
            console.log("index good");
            console.log();
            
            conn.release()
            return result.rows
    
        } catch (error) {
            throw new Error(`cant retrieve all users .ERROR: ${error}`);
        }
    }
    async show(id: string):Promise<User>{
        try {
            const conn= await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql,[id]) ;
            return result.rows[0]
        } catch (error) {
            throw new Error(`cant find  user with id = ${id} .ERROR: ${error}`);
        
        }
    }
    async create(u: User): Promise<User> {
        try {
     
     
      const conn = await client.connect()
      
      console.log(u);
      const sql = 'INSERT INTO users (username,first_name,last_name, password_digest) VALUES($1, $2,$3,$4) RETURNING *'
      
      const result = await conn.query(sql, [u.username,u.first_name,u.last_name,u.password_digest]);
      console.log(result);
      
        console.log("create good");
      console.log(result);
      
      conn.release()
    
      return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`)
        }
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(password+pepper)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            console.log("password is correct");
            
            return user
          }
        }
    
        return null
      }

}