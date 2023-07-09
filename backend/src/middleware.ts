
import { Auth } from "./lib/auth"

export async  function authenticateToken (req:any, res:any, next:any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  let authInstance = new Auth({
    username: "null",
    location: 1
  })
  
  if (token == null) return res.sendStatus(401)

  let decodedToken = await authInstance.verify(token)
  console.log(decodedToken)
   
  next()
  
}
