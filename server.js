import express from "express";
import bodyParser from "body-parser"
import useRouter from "./routes/user-Router.js";
import contenRoutes from "./routes/contect-routes.js";
import cors from 'cors';
import { connectToDatabase } from "./db-connection.js";
import cookieParser from "cookie-parser";



const app = express();
const port = 4000;


app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())


const allowedOrigins = [

  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost/*"
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin:',origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
*/

connectToDatabase();



app.use("/api/content", contenRoutes)
app.use("/api/user", useRouter)






app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
