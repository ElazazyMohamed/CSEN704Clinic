import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";
import jwt from 'jsonwebtoken';
export const createDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    hourlyRate,
    affiliation,
    speciality,
    availability,
    educationBg,
    status,
    availableTimeSlots, 
  } = req.body;
  try {
    const doctor = await doctorModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      hourlyRate,
      affiliation,
      speciality,
      availability,
      educationBg,
      status,
      availableTimeSlots,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const fetchDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
export const fetchPendingDoctor = async (req, res) => {
  try {
    // Exclude doctors with "approved" status
    const doctors = await Doctor.find({ status: { $ne: "approved" } });
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteDoctor = async (req, res) => {
    const{username}=req.body;

    try {
      const deletedUser = await doctorModel.findOneAndDelete({ username});
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

export const updateDoctor = async (req, res) => {
  const { username, email, hourlyRate, affiliation, status} = req.body;
  const updateFields = {};

  // Check if email is provided and update it
  if (email) {
    updateFields.email = email;
  }

  // Check if hourlyRate is provided and update it
  if (hourlyRate !== undefined !=="") {
    updateFields.hourlyRate = hourlyRate;
  }

  // Check if affiliation is provided and update it
  if (affiliation) {
    updateFields.affiliation = affiliation;
  }

  // Check if status is provided and update it
  if (status) {
    updateFields.status = status;
  }

  try {
    const updatedDoctor = await doctorModel.findOneAndUpdate(
      { username },
      updateFields,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//fetch patients 
export const fetchPatients = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const username = decodedToken.username ;
        const doctor = await doctorModel.findOne({ username });
        if (!doctor) {
          return res.status(404).json({ error: "Doctor not found" });
        }
        const patients = await patientModel.find({ "appointments.doctor": doctor._id });
        if (!patients.length) {
          return res.status(404).json({ error: "Doctor has No Patients yet !" });
        }
        res.status(200).json(patients);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//view health records of a patient
export const viewHealthRecords = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await patientModel.findOne({ _id : patientId });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const healthrecords = patient.healthrecords;
    res.status(200).json(healthrecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add new health record for a patient
export const addhealthrecord = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const dusername = decodedToken.username;
        const doctor = await doctorModel.findOne({ username: dusername });
        if (!doctor) {
          return res.status(404).json({ error: "you are not a doctor" });
        }
        const doctorName = doctor.name;
        const { patientId } = req.params;
        const { doctorNotes ,description } = req.body;
        const healthrecord = await patientModel.findOneAndUpdate(
          { _id : patientId },
          { $push: { healthrecords: { doctorNotes, description, by: "Dr/"+ doctorName} } },
          { new: true }
        );
        res.status(200).json({ message: "Health record added successfully." });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//get all appointments
export const getappointments = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token){
    return res.status(400).json({error:"Not Logged in"})
     } else {
      const decodedToken =  jwt.verify(token, 'supersecret') 
      const username = decodedToken.username ;
      console.log(username)
      //const role  = decodedToken.role ;
  try {
    // Fetch appointments from the database
    const doctor = await doctorModel.findOne({ username });
    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    // Find patients associated with the doctor and populate their appointments
    // const patients = await patientModel
    //   .find({ doctor: doctor._id })
    //   .populate("appointments");
    const appointments = doctor.appointments ;

    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }}
};
export const addAvailableTimeSlot = async (req, res) => {
  const { username, date, time } = req.body;

  try {
    // Check if the doctor is accepted by the admin and has accepted the employment contract
    const doctor = await doctorModel.findOne({ username });
    
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Add the new available time slot
    doctor.availableTimeSlots.push({ date, time });
    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getWallet = async (req,res) => {
  const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const doctor = await doctorModel.findOne({ username: username });
        res.json(doctor.wallet);
      }
    });
 }



export const reservefollowup = async (req, res) => {
  try {
    const token = req.cookies.jwt;
 
     jwt.verify(token, "supersecret", async (err, decodedToken) => {
       if (err) {
         res.status(400).json({ message: "You are not logged in." });
       } else {
         console.log("test")
         const {  appointment } = req.body;
         const username = decodedToken.username;
         console.log(username)
         const doctor =await doctorModel.findOne({username : username});
         const patient =await patientModel.findById(appointment.patient);
         console.log(doctor.username)
         if (!patient || !doctor) {
           return res.status(404).json({ message: 'Patient or doctor not found.' });
         }
         console.log(patient.username)
         patient.appointments.push({
           date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Add 2 days in milliseconds           ,
           status: 'reserved',
           doctor: doctor._id,
           type : appointment.type
         });
         doctor.appointments.push({
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Add 2 days in milliseconds           ,
          status: 'reserved',
           patient: patient._id,
           type : appointment.type
         });
         await patient.save();
         await doctor.save();
         res.status(200).json({ error: 'Appointment reserved successfully.' });
 
       }
     });
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
 
 }




