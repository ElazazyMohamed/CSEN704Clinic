import patientModel from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import doctorModel from "../models/doctorModel.js";
import stripe from "stripe";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';

// create a new patient
export const createPatient = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    emergencyFullName,
    emergencyPhoneNumber,
    packages,
  } = req.body;
  try {
    const patient = await patientModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      emergencyFullName,
      emergencyPhoneNumber,
      packages,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPatient = async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  const { username } = req.body;

  try {
    const deletedUser = await patientModel.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  const { username, doctor, packages } = req.body;
  try {
    const updatedUser = await patientModel.findOneAndUpdate(
      { username },
      { doctor, packages },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add family member

export const addFamilyMember = async (req, res) => {
  try {
    const patientusername = req.body.username;
    const newFamilyMember = req.body; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOne({ username: patientusername });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember);

    // Save the updated patient document
    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const addPackageToFamilyMember = async (req, res) => {
  try {
    const patientusername = req.body.username;
    const familyMemberName = req.body.familyMemberName; // The ID of the family member to update
    const packageType = req.body.packageType; // The ID of the package to add

    const patient = await patientModel.findOne({ username: patientusername });

    patient.familyMembers.forEach(async (familyMember) => {
      if (familyMember.name == familyMemberName) {
        familyMember.packageType = packageType;
      }
    });
  } catch (error) {
    console.error("Error adding package to family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

//get prescriptions of a patient
export const getPrescriptions = async (req, res) => {
  const username = req.query.username;
  try {
    const patient = await patientModel.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const prescriptions = patient.prescription;
    const { name } = doctorModel.findOne({ _id: prescriptions.doctor });
    prescriptions.create(name);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addPrescription = async (req, res) => {
  const username = req.query.username;
  const { name, price, description, img, date, doctor } = req.body;
  try {
    const prescription1 = await patientModel.findOneAndUpdate(
      { username },
      { prescription: { name, price, description, img, date, doctor } }
    );
    res.status(200).json(prescription1);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get family members of a patient
export const getFamilyMembers = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the patient by username and populate the familyMembers field
    const patients = await patientModel
      .findOne({ username })
      .populate("familyMembers");

    if (!patients) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Extract and send the familyMembers array from the patient document
    const familyMembers = patients.familyMembers;

    res.status(200).json(familyMembers);
  } catch (error) {
    console.error("Error fetching family members:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

//add doctor to a patient

export const adddoctor = async (req, res) => {
  try {
    const patientusername = req.body.patientusername;
    const doctorid = req.body.doctorid; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOneAndUpdate(
      { username: patientusername },
      { doctor: doctorid },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getappointments

export const getappointments = async (req, res) => {
  const { username } = req.params;
  try {
    // Fetch appointments from the database
    const patients = await patientModel
      .findOne({ username })
      .populate("appointments");
    if (!patients) {
      return res.status(400).json({ error: "Patient not found" });
    }
    const appointments = patients.appointments;
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 37 view a list of all doctors along with their speciality, session price (based on subscribed health package if any)

// Fetch all doctors along with their speciality and calculated session price
export const viewDoctorsWithSessionPrice = async (req, res) => {
  try {
    // Fetch all doctors
    const doctors = await Doctor.find().select(
      "name speciality hourlyRate availability"
    );

    // Get the patient's username from the request (you might adjust this based on your actual request structure)
    const { username } = req.body;

    // Find the patient by username and populate the packages field
    const patient = await patientModel
      .findOne({ username })
      .populate("packages");

    // Calculate session price for each doctor
    const doctorsWithSessionPrice = doctors.map((doctor) => {
      // Assume a default discount of 0% if the patient or patient's packages are not available
      let discount = 0;

      // If the patient has a health package, extract the discount
      if (patient && patient.packages) {
        discount = patient.packages.discount;
      }

      // Calculate session price based on the provided formula
      const sessionPrice =
        doctor.hourlyRate +
        0.1 * doctor.hourlyRate -
        (doctor.hourlyRate * discount) / 100;

      return {
        name: doctor.name,
        speciality: doctor.speciality,
        sessionPrice: sessionPrice.toFixed(2), // Round to two decimal places
      };
    });

    res.status(200).json(doctorsWithSessionPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 38 search for a doctor by name and/or speciality

export const searchDoctor = async (req, res) => {
  const { doctorName, speciality } = req.query;

  try {
    let query = {};

    if (doctorName) {
      query.name = { $regex: new RegExp(doctorName, "i") };
    }

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, "i") };
    }

    // Find doctors based on the query
    const doctors = await Doctor.find(query);

    if (doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res
        .status(404)
        .json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 39 filter a doctor by speciality and/or availability on a certain date and at a specific time

export const filterDoctors = async (req, res) => {
  const { speciality, date, time } = req.query;

  try {
    let query = {};

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, "i") };
    }

    // Using availability field
    if (date && time) {
      query.availability = {
        $elemMatch: {
          date: new Date(date),
          time: time,
        },
      };
    }

    // Find doctors based on the query
    const doctors = await Doctor.find(query);

    if (doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res
        .status(404)
        .json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 40 select a doctor from the search/filter results

export const selectDoctor = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the selected doctor by username
    const selectedDoctor = await Doctor.findOne({ username });

    if (selectedDoctor) {
      res.status(200).json(selectedDoctor);
    } else {
      res
        .status(404)
        .json({ message: "Doctor not found with the given username." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2

// patient adding health record
export const addhealthrecord = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const { description } = req.body;
        const file = req.file.path;
        const healthrecord = await patientModel.findOneAndUpdate(
          { username },
          { $push: { healthrecords: { file, description, by: "patient" } } },
          { new: true }
        );
        res.status(200).json({ message: "Health record added successfully." });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to download health record file
export const downloadHealthRecordFile = async (req, res) => {
  try {
    const { recordId } = req.params;

    // Find the patient that has the health record with the given ID
    const patient = await patientModel.findOne({ "healthrecords._id": recordId });

    if (!patient) {
      return res.status(404).json({ message: "Health record not found.1" });
    }

    // Find the health record within the patient's health records array
    const record = patient.healthrecords.id(recordId);

    if (!record) {
      return res.status(404).json({ message: "Health record not found.2" });
    }

    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirPath = dirname(currentFilePath);
    const file = record.file;
    const filePath = path.join(currentDirPath, `../${file}`);
    res.download(filePath);
  } catch (error) {
    console.error("Error downloading health record file:", error);
    res.status(500).json({ error: "Failed to download health record file." });
  }
};

// Patient removing health record
export const removeHealthRecord = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const { recordId } = req.params; // Assuming the record ID is passed as a URL parameter

        // Find the patient and pull the health record from the array
        const updatedPatient = await patientModel.findOneAndUpdate(
          { username },
          { $pull: { healthrecords: { _id: recordId } } },
          { new: true }
        );

        if (!updatedPatient) {
          // If the patient is not found or the health record does not exist
          return res.status(404).json({ message: "Health record not found." });
        }

        res
          .status(200)
          .json({ message: "Health record removed successfully." });
      }
    });
  } catch (error) {
    console.error("Error removing health record:", error);
    res.status(400).json({ error: "Failed to remove health record." });
  }
};

//view health records for the current patient logged in
export const viewHealthRecords = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const patient = await patientModel.findOne({ username });
        const healthrecords = patient.healthrecords;
        res.status(200).json(healthrecords);
      }
    });
  } catch (error) {
    console.error("Error retrieving health records:", error);
    res.status(500).json({ error: "Failed to retrieve health records." });
  }
}

 //helping func
 //view all patients there is
 export const viewAllPatients = async (req,res) => {
  const patients = await patientModel.find({});
  res.json(patients);
}
export const viewAllDoctors = async (req,res) => {
  const doctors = await doctorModel.find({});
  res.json(doctors);
}

export const payAppointment = async (req, res) => {
  const { healthPackage } = req.body;
  const { price } = req.body;
  healthPackage = healthPackage.toLowerCase();
  if ( healthPackage == 'silver' )
    price = (price * 1.1) - (price * 1.4);
  else if ( healthPackage == 'gold' )
    price = (price * 1.1) - (price * 1.6);
  else if ( healthPackage == 'platinum' )
    price = (price * 1.1) - (price * 1.8);
  else 
  price = (price * 1.1);
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: `Doctor's Appointment`,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:3000/patient/home`,
    cancel_url: `http://localhost:3000/patient/home`,
  });
  res.redirect(303, session.url);
 };
 export const payPackage = async (req, res) => {
  const { patient , packageType , familyNationalID , familySubscription }= req.body;
  let price = 0;
  const healthPackage = packageType.toLowerCase();
  let name = '';
  //const url = 'http://localhost:4000/api/patient/success-payment/patient?='+patient+'/packageType='+packageType+'/familyNationalID='+familyNationalID+'/familySubscription='+familySubscription ;
  if ( healthPackage == 'silver' )
  {
    name = 'Silver Health Package'
    price = 3600;
  }
  else if ( healthPackage == 'gold' )
  {
    name = 'Gold Health Package'
    price = 6000;
  }  
  else if ( healthPackage == 'platinum' )
  {
    name = 'Platinum Health Package'
    price = 9000 ;
  }
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: name,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/patient/home',
    cancel_url: `http://localhost:3000/patient/home`,
  });
  res.json({url:session.url});
 }

   export const reserveappointment = async (req, res) => {
 try {
   const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        console.log("test")
        const {  selectedUser, appointment,reservetype } = req.body;
        const username = decodedToken.username;
        console.log(username)
        const patient =await patientModel.findOne({username : username});
        const doctor =await doctorModel.findById(selectedUser._id);
        console.log(doctor.username)
        if (!patient || !doctor) {
          return res.status(404).json({ message: 'Patient or doctor not found.' });
        }
        console.log(patient.username)
        patient.appointments.push({
          date: new Date(appointment.date),
          status: 'reserved',
          doctor: doctor._id,
          type : reservetype
        });
        doctor.appointments.push({
          date: new Date(appointment.date),
          status: 'reserved',
          patient: patient._id,
          type: reservetype
        });
        patient.chats.push({
          firstPerson: patient.username,
          secondPerson: doctor.username,
          messages:[]
        });
        doctor.chats.push({
          firstPerson: doctor.username,
          secondPerson: patient.username,
          messages:[]
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


export const getWallet = async (req,res) => {
      const token = req.cookies.jwt;
      jwt.verify(token, "supersecret", async (err, decodedToken) => {
        const username = decodedToken.username;
        const patient = await patientModel.findOne({ username: username });
        res.json(patient.wallet);
    });
 }

 export const linkFamily = async (req, res) => {
   const token = req.cookies.jwt;

   jwt.verify(token, 'supersecret', async (err, decodedToken) => {
     if (err) {
       res.status(400).json({message:"You are not logged in."})
     } else {
       const username = decodedToken.username ;
    try {

    const {role,email,number} = req.body; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOne({ username: username });
    let familyMember = await patientModel.findOne({email:email}); 
    if(!familyMember)
    familyMember = await patientModel.findOne({phoneNumber:number})
    if (!familyMember)
      return res.status(404).json({ message: "Patient not found" });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    familyMember = await patient.familyMembers.create(
      {
        relationToPatient: role,
        name: familyMember.name,
        gender: familyMember.gender,
        age: familyMember.dob
      }
    )
    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(familyMember);

    // Save the updated patient document
    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
}
});
};
export const payAppointment2 = async (req, res) => {
  let price = 100;
  let name = `Doctor's Appointment`
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: name,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:3000/patient/home`,
    cancel_url: `http://localhost:3000/patient/home`,
  });
  res.redirect(303, session.url);
 };
 export const payPackage2 = async (req, res) => {
  let price = 9000;
  let name = `Platinum Package`
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: name,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:3000/patient/home`,
    cancel_url: `http://localhost:3000/patient/home`,
  });
  res.redirect(303, session.url);
 };


