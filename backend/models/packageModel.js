import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    
    type: {
        type: String,
        required: true,
        unique: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    clinicDiscount: {
        type: Number,
        required: true,
    },
    pharmacyDiscount: {
        type: Number,
        required: true,
    },
    familyDiscount: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Package',packageSchema)