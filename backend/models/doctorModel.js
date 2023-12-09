import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
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

const doctorSchema = new mongoose.Schema({
    
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
  speciality: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  wallet:{
    type: Number,
    default: 0,
  },
  availableTimeSlots: [availabilitySchema],
  availability: [availabilitySchema],
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
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
      type :{
        type:String
      }
    },
  ],
  chats:[chatSchema],
});

export default mongoose.model('Doctor',doctorSchema)