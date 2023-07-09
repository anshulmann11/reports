import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { Auth } from './lib/auth'
import {authenticateToken} from './middleware'
import dotenv from 'dotenv'

const prisma = new PrismaClient()
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

// app.use('/',require('./routes/index'))

app.post('/token', async(req,res)=>{
  try {
    let authInstance = new Auth({
      username: "Anshul Mann",
      location : 1
    })
    let accesToken =await authInstance.generateAccessToken()
    console.log("Access TOken ",accesToken )
    res.json({
      accesToken
    })
  } catch (err) {
    res.json(err)
  }
  
})
app.post('/user', authenticateToken ,async (req,res)=>{

  
  let user = await prisma.users.create({
    data : {
      username : "username",
      first_name: "firstname",
      last_name :"lastname",
      location_id : 1 ,
      role_id : 1,
      client_id : 1 ,
      email: "asnhul@gmail.com",
      gender_ : 1 ,
      manager_id : 1

    }
  })
 
  console.log(typeof user.manager_id)
  res.status(200).json({
    status: true,
    data: user
  })
})


const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001',
  ),
)
