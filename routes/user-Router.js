import express from 'express'
import { useValidator, validate, logInValidator } from '../maddleWare/useValidator.js'
import { getUser, signUp, logIn, updateUserData, deleteUser } from '../controllers/userController.js'

 const useRouter=express.Router()



 useRouter.get("/", getUser)
 useRouter.put("/:uid", updateUserData)
 useRouter.delete("/:uid", deleteUser)
 useRouter.post("/signup",useValidator, validate,   signUp)
 useRouter.post("/login",logInValidator,validate,   logIn)

 

 export default useRouter



