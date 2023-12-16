import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
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
    type : Date , // Date (ISO format); "2023-12-31" 
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
    enum: ["registered", "pending", "accepted", "rejected"],
    default: "registered",
  },
  requiredDocuments: {
    medicalId: {
      type: String,
    },
    medicalLicense: {
      type: String,
    },
    medicalDegree: {
      type: String,
    },
    speciality: {
      type: String,
    },
    default: {},
  },  
  employmentContract: {
    markup: {
      type: Number,
    },
    doctorAcceptance: {
        type: Boolean,
    },
    adminAcceptance: {
        type: Boolean,
    },
    default: {},
  },
  workingSlots: [{
    day: {
      type: String,
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      required: false,
    },
    slot: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th"],
      required: false,
    },
  }],
  registered: {
    patients: [],
  },
  appointments: {
    appointment: [{
        date: {
          type: Date, // Date (ISO format); "2023-12-31" 
        },
        day: {
          type: String,
          enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        },
        slot: {
          type: String,
          enum: ["1st", "2nd", "3rd", "4th", "5th"],
        },
        status: {
            type: String,
            enum: ["upcoming", "completed", "cancelled", "rescheduled"],
        },
        type: {
            type: String,
            enum: ["self", "familyMember"],
        },
        patient: {
            type: String,
        },
    }],
    default: [],
  },
  // wallet:{
  //   type: Number,
  //   default: 0,
  // },
});

export default mongoose.model('Doctor',doctorSchema)