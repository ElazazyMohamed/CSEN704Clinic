import mongoose from "mongoose";

// const availabilitySchema = new mongoose.Schema({
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   });

//   const messageSchema = new mongoose.Schema({
//     sender: {
//       type: String,  
//       required: true,
//     },
//     receiver: {
//       type: String,   
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//   });
  
//   const chatSchema = new mongoose.Schema({
//     firstPerson: {
//       type: String,   //  firstPerson
//       required: true,
//     },
//     secondPerson: {
//       type: String,   // secondPerson
//       required: true,
//     },
//     messages: [messageSchema] // Array of messages
//   });

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
  password: {
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
    enum: ["registered", "pending", "accepted", "rejected"],
    default: "registered",
  },
  requiredDocuments: {
    medicalId: {
      data: Buffer,
      contentType: String,
    },
    medicalLicense: {
      data: Buffer,
      contentType: String,
    },
    medicalDegree: {
      data: Buffer,
      contentType: String,
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
  registered: {
    patients: [],
  },
  appointments: {
    appointment: [{
        date: {
            type: Date,
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
    },],
    default: [],
  },
  // speciality: {
  //   type: String,
  // },
  // wallet:{
  //   type: Number,
  //   default: 0,
  // },
  // availability: [availabilitySchema],
  // chats:[chatSchema],
});

export default mongoose.model('Doctor',doctorSchema)