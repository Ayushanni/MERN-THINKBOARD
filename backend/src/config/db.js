import mongoose from "mongoose"

export const connectDb=async (req,res)=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MONGODB CONNECTED SUCCESFULLY");
    } catch (e) {
        console.log("error connecting to mongodb", e);
        process.exit(1);
    }
}