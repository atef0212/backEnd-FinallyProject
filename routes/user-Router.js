import express from 'express'
import { useValidator, validate } from '../maddleWare/useValidator.js'
import { getUser, signUp } from '../controllers/userController.js'
 const useRouter=express.Router()
 useRouter.get("/", getUser)
 useRouter.post("/signup",useValidator, validate,   signUp)

 export default useRouter



