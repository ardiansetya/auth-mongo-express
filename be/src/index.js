import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../db/index.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();


const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRouter)


app.listen(port, () => {
   connectDB();
   console.log(`Server is running on port ${port}`);
})



