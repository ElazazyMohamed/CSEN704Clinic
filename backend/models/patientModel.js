import mongoose from "mongoose";

// const healthrecord = new mongoose.Schema({
//   date: {
//     type: Date,
//     default: Date.now(),
//   },
//   uploadedBy: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   file: {
//     data: Buffer,
//     contentType: String,
//   },
//   doctorNotes: {
//     type: String,
//     required: true,
//   },
// });

// const prescriptionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   img: {
//     data: Buffer,
//     contentType: String,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   doctor: {
//     username: String,
//     name: String,
//   },
//   filled: {
//     type:Boolean,
//     required: true,
//   }
// });

// const familyMemberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//   },
//   nationalID: {
//     type: String,
//     required: false,
//   },
//   age: {
//     type: Number,
//     required: false,
//   },
//   gender: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: false,
//   },
//   phoneNumber: {
//     type: String,
//     required: false,
//   },
//   relationToPatient: {
//     type: String,
//     enum: ["wife", "husband", "parent", "child"],
//     required: true,
//   },
//   packageType: {
//     type: String,
//     required: false,
//   },
// });

// const messageSchema = new mongoose.Schema({
//   sender: {
//     type: String,  
//     required: true,
//   },
//   receiver: {
//     type: String,   
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const chatSchema = new mongoose.Schema({
//   firstPerson: {
//     type: String,   //  firstPerson
//     required: true,
//   },
//   secondPerson: {
//     type: String,   // secondPerson
//     required: true,
//   },
//   messages: [messageSchema] // Array of messages
// });


const patientSchema = new mongoose.Schema({
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
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  phoneNumber: {
    type: String,
  },
  emergencyContact: {
    fullName: String,
    phoneNumber: String,
    relation: {
      type: String,
      enum: ["parent", "child", "wife", "husband", "sibling"],
    },
  },
  registered: {
    doctors: [],
  },
  health: {
    records:[{
      date: {
        type: Date,
        default: Date.now(),
      },
      uploadedBy: {
        type: String, 
      },
      description: {
        type: String,
      },
      file: {
        type: String, 
      },
      doctorNotes: {
        type: String,
      },
    }],
    default: [],
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
        doctor: {
            type: String,
        },
    }],
    default: [],
  },
  family:{
    members: [{
      name: {
        type: String,
      },
      nationalId: {
        type: String,
      },
      age: {
        type: String,
      },
      gender: {
        type: String,
      },
      relation: {
        type: String,
        enum: ["parent", "child", "wife", "husband", "sibling"],
      },
    }],
    default: [],
  },
  prescription: {
    type: [{
      doctor: { 
        type: String
      },
      date: { 
        type: Date, 
        default: Date.now 
      },
      medicines: [{
        medicine: { 
          type: String,
        },
        dosage: { 
          type: String 
        },
        duration: { 
          type: String 
        },
      }],
      filled: { 
        type: Boolean, 
        default: false 
      },
    }],
    default: [],
  },
  packageType: {
    type: String,
    required: false,
  },
  packages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: false,
  },
  // wallet: {
  //   type : Number,
  //   default : 0,
  // },
  // prescription: [prescriptionSchema],
  // familyMembers: [familyMemberSchema], // Array of family members
  // healthrecords: [healthrecord],
  // appointments: [
  //   {
  //     date: {
  //       type: Date,
  //       required: true,
  //     },
  //     status: {
  //       type: String,
  //       enum: ["upcoming", "completed", "cancelled", "rescheduled"],
  //       required: true,
  //     },
  //     doctor: {
  //       name: String,
  //       username: String,
  //     },
  //     type:{
  //       type:String
  //     }
  //   },
  // ],
  // chats:[chatSchema],
});

export default mongoose.model("Patient", patientSchema);