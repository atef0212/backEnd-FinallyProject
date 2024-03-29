import express from "express";
import useRouter from "./routes/user-Router.js";

import { connectToDatabase } from "./db-connection.js";
const app = express();
const port = 4000;

app.use(express.json())
connectToDatabase();


app.use("/user", useRouter)






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
