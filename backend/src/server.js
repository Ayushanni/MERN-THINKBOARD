import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();

const PORT=process.env.PORT || 5001
const __dirname=path.resolve()

if(process.env.NODE_ENV !=="production"){
  app.use(
  cors({
    origin:"http://localhost:5173",
  }));

}



app.use(express.json());  //this middleware will parse the json bodies in short will get access to req.body or req.something
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});
}



connectDb().then(()=>{
  app.listen(PORT, () => {
  
  console.log("server started on port"+PORT);
});

})


