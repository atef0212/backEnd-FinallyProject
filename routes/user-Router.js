import express from 'express'
import { useValidator, validate } from '../maddleWare/useValidator.js'
import { getUser, signUp, logIn } from '../controllers/userController.js'
 const useRouter=express.Router()
 useRouter.get("/", getUser)
 useRouter.post("/signup",useValidator, validate,   signUp)
 useRouter.post("/logIn",useValidator, validate,   logIn)

 export default useRouter



