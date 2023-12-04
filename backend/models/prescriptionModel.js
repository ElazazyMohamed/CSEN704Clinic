import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    img:{
          data: Buffer,
          contentType: String
        }
  })
  module.exports=prescriptionSchema;