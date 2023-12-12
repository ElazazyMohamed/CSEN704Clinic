import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    }, 
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
    }, 
    dob: {
        type : Date ,
    }, 
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 11,
    }, 
    hourlyRate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    educationBg: {
        type: String,
        required: true,
    },
    idDocument: {
        type: String, // Store the file path or link to the uploaded ID document
    },
    pharmacyDegreeDocument: {
        type: String, // Store the file path or link to the uploaded pharmacy degree document
    },
    workingLicenseDocument: {
        type: String, // Store the file path or link to the uploaded working license document
    },
});

export default mongoose.model('Pharmacist', pharmacistSchema);