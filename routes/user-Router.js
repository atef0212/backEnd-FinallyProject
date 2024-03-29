import express from 'express'
import { useValidator, validate } from '../maddleWare/useValidator.js'
import { getUser, addUser } from '../controllers/userController.js'
 const useRouter=express.Router()
 useRouter.get("/", getUser)
 useRouter.post("/",useValidator, validate,   addUser)

 export default useRouter



