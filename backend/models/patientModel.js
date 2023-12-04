import mongoose from "mongoose";

const healthrecord = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  by: {
    type: String,
  },
  file: {
    type: String,
  },
  doctorNotes: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: {
    type: Date,
  },
  doctorName: {
    type: String,
    default: "soubky",
  },
});

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationalID: {
    type: String,
    unique: true,
    sparse: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  relationToPatient: {
    type: String,
    enum: ["wife", "husband", "child"],
    required: true,
  },
  packageType: {
    type: String,
    required: false,
  },
});

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,  
    required: true,
  },
  receiver: {
    type: String,   
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  firstPerson: {
    type: String,   //  firstPerson
    required: true,
  },
  secondPerson: {
    type: String,   // secondPerson
    required: true,
  },
  messages: [messageSchema] // Array of messages
});


const patientSchema = new mongoose.Schema({
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
    type: Date,
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
  emergencyFullName: {
    type: String,
    required: true,
  },
  emergencyPhoneNumber: {
    type: Number,
    required: true,
    minlength: 11,
  },
  packageType: {
    type: String,
    required: false,
  },
  packages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
  },
  wallet: {
    type : Number,
    default : 0
  },
  prescription: [prescriptionSchema],
  familyMembers: [familyMemberSchema], // Array of family members
  healthrecords: [healthrecord],
  appointments: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
      type:{
        type:String
      }
    },
  ],
  chats:[chatSchema],
});

export default mongoose.model("Patient", patientSchema);
