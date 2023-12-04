import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});

export default mongoose.model('Admin',adminSchema)