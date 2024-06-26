import express from 'express'
import { useValidator, validate, logInValidator } from '../maddleWare/useValidator.js'
import { getUser, signUp, logIn, updateUserData, deleteUser, logOut,getUsers } from '../controllers/userController.js'
 const useRouter=express.Router()


//usersEndPoint
useRouter.get("/", getUsers)
 useRouter.get("/:uid", getUser)
 useRouter.put("/:uid", updateUserData)
 useRouter.delete("/:uid", deleteUser)
 useRouter.post("/signup",useValidator, validate,   signUp)
 useRouter.post("/login",   logIn)
 useRouter.post("/logout",  logOut)



 

 export default useRouter



