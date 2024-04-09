import {
  updateContent,
  createContent,
  getContentByUserId,deletContent
} from "../controllers/content-Con.js";

import { useValidatorContent, validate } from "../maddleWare/useValidator.js";
import { checkAuth } from "../maddleWare/check-auth.js";
import express, { Router } from "express";


const contenRoutes = express.Router();


 //ContentsEndPoint


contenRoutes.get("/user/:uid", getContentByUserId);
contenRoutes.use(checkAuth);
contenRoutes.delete("/pid", deletContent)
contenRoutes.put("/:pid", updateContent);
contenRoutes.post("/",useValidatorContent,validate, createContent);



export default contenRoutes;
