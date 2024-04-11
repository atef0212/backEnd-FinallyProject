import {
  updateContent,
  createContent,
  getContentByUserId,deletContent
} from "../controllers/content-Con.js";

import { useValidatorContent, validate } from "../maddleWare/useValidator.js";
import { checkAuth } from "../maddleWare/check-auth.js";
import express from "express";


const contenRoutes = express.Router();


 //ContentsEndPoint


contenRoutes.get("/:uid", getContentByUserId);
contenRoutes.use(checkAuth);
contenRoutes.delete("/cid", deletContent)
contenRoutes.put("/:cid", updateContent);
contenRoutes.post("/",useValidatorContent,validate, createContent);



export default contenRoutes;
