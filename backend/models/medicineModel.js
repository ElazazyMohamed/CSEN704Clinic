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
    available: {
        type: Boolean,
        default: false,
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
        enum: ["Pain Management", "Antibiotic", "Anti-Inflammatory", "Fever Reducer", "Allergy Relief", 
               "Cardiovascular Health", "Digestive Health", "Respiratory Health", "Vitamin/Supplement"],
    },
    image: {
        type: String,
    }
});

export default mongoose.model('medicine',medicineSchema)