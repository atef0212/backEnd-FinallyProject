import { updatePlace, createContent, getContentByUserId } from "../controllers/content-Con.js";
import { checkAuth } from "../maddleWare/check-auth.js";
import express, { Router } from 'express'
const contenRoutes=express.Router()
contenRoutes.get("/user/:uid", getContentByUserId)
contenRoutes.use(checkAuth)
contenRoutes.put("/:pid", updatePlace)
contenRoutes.post("/", createContent)

export default contenRoutes