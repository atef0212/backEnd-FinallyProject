import express from "express";
import bodyParser from "body-parser"
import useRouter from "./routes/user-Router.js";
import contenRoutes from "./routes/contect-routes.js";
import { connectToDatabase } from "./db-connection.js";
import cors from 'cors'
const app = express();
const port = 4000;

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
  next()
})
connectToDatabase();

app.use("/api/content", contenRoutes)
app.use("/api/user", useRouter)






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
