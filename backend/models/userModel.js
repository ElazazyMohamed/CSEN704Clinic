import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    }, 
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Admin", "Doctor", "Patient"],
      }
});

export default mongoose.model('User',userSchema)