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
    archive: {
        type: Boolean,
        default: false,
    },
    salesHistory: {
        sales: [{
          year: {
            type: Number,
          },
          month: {
            type: String,
            // enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          },
          count: {
            type: Number,
            default: 0,
          },
          amount: {
            type: Number,
            default: 0,
          },
        }],
        default: [],
    },
    description: {
        type: String,
    },
    medicalUse: {
        type: String,
    },
    prescribed: {
        type: Boolean
    },
    image: {
        type: String,
    }
});

export default mongoose.model('medicine',medicineSchema)