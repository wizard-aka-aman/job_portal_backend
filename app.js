import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import userRouter from "./routes/userRouter.js"
import {dbconnection} from "./database/dbconnection.js"
import {errorMiddleware} from "./middlewares/error.js"

const app = express(); 
dotenv.config({ path: "./config/config.env" }); 

app.use(cors({
    origin : [process.env.FRONTEND_URL , "https://job-portal-backend-uz7u.onrender.com", "https://job-portal-frontend-8iif.onrender.com"],
    methods: ['POST' , 'GET' , 'DELETE' , 'PUT'],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

app.use('/api/v1/user',userRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/application',applicationRouter)

dbconnection();

app.use(errorMiddleware)


export default app;
