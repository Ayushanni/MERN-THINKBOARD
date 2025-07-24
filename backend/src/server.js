import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();

const PORT=process.env.PORT || 5001


app.use(
  cors({
    origin:"http://localhost:5173",
  }));
app.use(express.json());  //this middleware will parse the json bodies in short will get access to req.body or req.something
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);

connectDb().then(()=>{
  app.listen(PORT, () => {
  
  console.log("server started on port"+PORT);
});

})


