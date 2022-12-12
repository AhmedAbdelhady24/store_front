import express , {Request,Response,NextFunction} from 'express'


import jwt from 'jsonwebtoken'
export function verifyAuthToken (req: Request, res: Response, next: NextFunction): void | boolean {
    if (!req.cookies['x-access-token']) {
      res.status(401)
      res.json("Access denied, invalid token")
  
      return false
    }
    
    try {
        let token = req.cookies['x-access-token'];
        console.log(token);
  
      jwt.verify(token, process.env.TOKEN_SECRET as string)
  
      next()
    } catch (err) {
      console.error(err)
  
      res.status(401)
      res.json("Access denied, invalid token")
  
      return false
    }
  }
export default verifyAuthToken ;
