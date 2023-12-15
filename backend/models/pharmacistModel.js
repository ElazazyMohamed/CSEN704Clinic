import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
    username: {
        type: String,
    }, 
    name: {
        type: String,
    }, 
    email: {
        type: String,
    }, 
    dob: {
        type : Date ,
    }, 
    hourlyRate: {
        type: Number,
    },
    affiliation: {
        type: String,
    },
    educationBg: {
        type: String,
    },
    status: {
        type: String,
        enum: ["registered", "accepted", "rejected"],
        default: "registered",
    },
    requiredDocuments: {
        pharmacyId: {
            type: String,
        },
        pharmacyLicense: {
            type: String,
        },
        pharmacyDegree: {
            type: String,
        },
        default: {},
      },
    // idDocument: {
    //     type: String, // Store the file path or link to the uploaded ID document
    //     default: "",
    //     required: false,
    // },
    // pharmacyDegreeDocument: {
    //     type: String, // Store the file path or link to the uploaded pharmacy degree document
    // },
    // workingLicenseDocument: {
    //     type: String, // Store the file path or link to the uploaded working license document
    // },
});

export default mongoose.model('Pharmacist', pharmacistSchema);