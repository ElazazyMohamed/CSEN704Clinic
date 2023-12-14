import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ingredients: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    medicalUse: {
        type: String,
        // i assumed here that the medical use can be described in 2 words maximum
        trim: true,
    },
    image: {
        type: String,
    }
});

export default mongoose.model('medicine',medicineSchema)