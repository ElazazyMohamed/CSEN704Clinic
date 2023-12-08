import patientModel from "../models/patientModel.js";
import jwt from "jsonwebtoken"
import doctorModel from "../models/doctorModel.js";
import fs from 'fs/promises';
import path from 'path';
// import stripe from "stripe";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// create a new patient
export const createPatient = async (req, res) => {
  const { username, name, email, password, dob, gender, phoneNumber, emergencyFullName, 
          emergencyPhoneNumber, packages } = req.body;
  try {
    const patient = await patientModel.create({ username, name, email, password, dob, gender, phoneNumber,
                                                emergencyFullName, emergencyPhoneNumber, packages });
    return res.status(200).json({message: "Patient Created Successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a patient
export const updatePatient = async (req, res) => {
  const { username, doctor, packages } = req.body;
  try {
    const updatedUser = await patientModel.findOneAndUpdate( { username }, { doctor, packages }, { new: true });
    return res.status(200).json({message: "Patient Updatted Successfully"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a patient
export const deletePatient = async (req, res) => {
  const { username } = req.body;
  try {
    const deletedUser = await patientModel.findOneAndDelete({ username: username });
    return res.status(200).json({message: "Patient Deleted Successfully"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// (Req 18) add family members using name, National ID, age, gender and relation to the patient 
export const setFamilyMember = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
          const patientusername = decodedToken.username;
          const { name, nationalID, age, gender, relationToPatient } = req.body;
          const newFamilyMember = {
                                    "name": name,
                                    "nationalID": nationalID,
                                    "age": age,
                                    "gender": gender,
                                    "relationToPatient": relationToPatient
                                  }
          const patient = await patientModel.findOne({ username: patientusername });
          patient.familyMembers.push(newFamilyMember);

          await patient.save();
          return res.status(200).json({message: "FamilyMember Added Successfully"});
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 22) view registered family members
export const getFamilyMembers = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
        const patientusername = decodedToken.username;
        const patient = await patientModel.findOne({username: patientusername});
        
        const familyMembers = patient.familyMembers;

        return res.status(200).json({ familyMembers });
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 37) view a list of all doctors along with their speciality, session price (based on subscribed health package if any)
export const getDoctorsNameSpecialitySessionPrice = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
        const patientusername = decodedToken.username;
        const patient = await patientModel.findOne({username: patientusername});

        const doctors = await doctorModel.find().select(
          "name speciality hourlyRate"
        );

        const resultDoctors = doctors.map((doctor) => {
          let discount = 0;
          if(patient.packages)
            discount = patient.packages.clinicDiscount;

          const sessionPrice = doctor.hourlyRate + (0.1*doctor.hourlyRate) - ((doctor.hourlyRate * discount) / 100);

          return ({
            "Name": doctor.name,
            "Speciality": doctor.speciality,
            "Session Price": sessionPrice.toFixed(2)
          }); 
        });
        return res.status(200).json(resultDoctors);
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 38) search for a doctor by name and/or speciality
export const getDoctorNameSpeciality = async (req, res) => {
  try {
    const { doctorName, speciality } = req.body;
    const doctor = await doctorModel.findOne({
      $or: [
        { name: doctorName },
        { speciality: speciality }
      ]
    });
    if (doctor) {
      return res.status(200).json(doctor);
    } else {
      return res.status(404).json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 39) filter a doctor by speciality and/or availability on a certain date and at a specific time
export const filterDoctorsSpecialityAvailability = async (req, res) => {
  try {
    const { speciality, date, time } = req.body;
    const doctors = await doctorModel.find({
      $or: [
        { speciality: speciality },
        { availability: { $elemMatch: { date: new Date(date), time: time } } }
      ]
    });
    if (doctors) {
      return res.status(200).json(doctors);
    } else {
      res.status(404).json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// (Req 40) select a doctor from the search/filter results, 
// (Req 41) view all details of selected doctor including specilaty, affiliation (hospital), educational background
export const selectDoctor = async (req, res) => {
  try {
    const { username } = req.params;
    const selectedDoctor = await doctorModel.findOne({ username: username })

    if (selectedDoctor) {
      return viewSelectedDoctor(req, res, username);
    } else {
      return res.status(404).json({ message: "Doctor not found with the given username." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const viewSelectedDoctor = async (req, res, username) => {
  try {
    const selectedDoctor = await doctorModel.findOne({ username: username }).select("name speciality affiliation educationBg availableTimeSlots");

    return res.status(200).json(selectedDoctor);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export const addPrescription = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
        const patientusername = decodedToken.username;
        const { name, price, description, img, doctor, date } = req.body;

        const newPrescription = { name, price, description, img, doctor, date };
        
        const patient = await patientModel.findOne({username: patientusername});
        patient.prescription.push(newPrescription);
        await patient.save();

        return res.status(200).json(newPrescription);
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 54) view a list of all my perscriptions
export const getPrescriptions = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
        const patientusername = decodedToken.username;
        const patient = await patientModel.findOne({ username: patientusername });

        return res.status(200).json(patient.prescription);
      }
    }); 
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 55) filter prescriptions based on date or doctor or filled or unfilled
export const filterPrescription = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ err: err.message });
      } else {
        const patientusername = decodedToken.username;
        const { date, doctor, filled } = req.body;

        const patient = await patientModel.findOne({
          username: patientusername,
        });

        let resultPrescriptions = patient.prescription.map((prescription) => ({
          id: prescription._id.toString(),
          name: prescription.name,
          price: prescription.price,
          description: prescription.description,
          doctor: prescription.doctor.name,
          date: prescription.date,
          filled: prescription.filled,
        }));

        if (date) {
          resultPrescriptions = resultPrescriptions.filter(
            (prescription) => prescription.date === date
          );
        }
        if (doctor) {
          resultPrescriptions = resultPrescriptions.filter(
            (prescription) => prescription.doctor.name === doctor
          );
        }
        if (filled !== undefined) {
          resultPrescriptions = resultPrescriptions.filter(
            (prescription) => prescription.filled === filled
          );
        }

        return res.status(200).json(resultPrescriptions);
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 56) select a prescription from my list of perscriptions
export const selectPrescription = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ err: err.message });
      } else {
        const patientusername = decodedToken.username;
        const { prescriptionId } = req.params;
        const patient = await patientModel.findOne({ username: patientusername });
        
        // Find the prescription in the patient's list based on prescriptionId
        const selectedPrescription = patient.prescription.find(
          (prescription) => prescription._id.toString() === prescriptionId
        );
        
        if (!selectedPrescription) {
          return res.status(404).json({ error: 'Prescription not found' });
        }

        return res.status(200).json({"message": "Prescription Selected Successfully", selectedPrescription});
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// export const fetchPatient = async (req, res) => {
//   try {
//     const patient = await patientModel.find();
//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const addPackageToFamilyMember = async (req, res) => {
//   try {
//     const patientusername = req.body.username;
//     const familyMemberName = req.body.familyMemberName; // The ID of the family member to update
//     const packageType = req.body.packageType; // The ID of the package to add

//     const patient = await patientModel.findOne({ username: patientusername });

//     patient.familyMembers.forEach(async (familyMember) => {
//       if (familyMember.name == familyMemberName) {
//         familyMember.packageType = packageType;
//       }
//     });
//   } catch (error) {
//     console.error("Error adding package to family member:", error);
//     res.status(400).json({ message: "Internal server error" });
//   }
// };

// //add doctor to a patient
// export const adddoctor = async (req, res) => {
//   try {
//     const patientusername = req.body.patientusername;
//     const doctorid = req.body.doctorid; // The new family member data from the request body

//     // Find the patient by username
//     const patient = await patientModel.findOneAndUpdate(
//       { username: patientusername },
//       { doctor: doctorid },
//       { new: true }
//     );

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     res.status(200).json(patient);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// //getappointments
// export const getappointments = async (req, res) => {
//   const { username } = req.params;
//   try {
//     // Fetch appointments from the database
//     const patients = await patientModel
//       .findOne({ username })
//       .populate("appointments");
//     if (!patients) {
//       return res.status(400).json({ error: "Patient not found" });
//     }
//     const appointments = patients.appointments;
//     res.status(200).json(appointments);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // 2

// // patient adding health record
// export const addhealthrecord = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     jwt.verify(token, "supersecret", async (err, decodedToken) => {
//       if (err) {
//         res.status(400).json({ message: "You are not logged in." });
//       } else {
//         const username = decodedToken.username;
//         const { description } = req.body;
//         const file = req.file.path;
//         const healthrecord = await patientModel.findOneAndUpdate(
//           { username },
//           { $push: { healthrecords: { file, description, by: "patient" } } },
//           { new: true }
//         );
//         res.status(200).json({ message: "Health record added successfully." });
//       }
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Function to download health record file
// export const downloadHealthRecordFile = async (req, res) => {
//   try {
//     const { recordId } = req.params;

//     // Find the patient that has the health record with the given ID
//     const patient = await patientModel.findOne({ "healthrecords._id": recordId });

//     if (!patient) {
//       return res.status(404).json({ message: "Health record not found.1" });
//     }

//     // Find the health record within the patient's health records array
//     const record = patient.healthrecords.id(recordId);

//     if (!record) {
//       return res.status(404).json({ message: "Health record not found.2" });
//     }

//     const currentFilePath = fileURLToPath(import.meta.url);
//     const currentDirPath = dirname(currentFilePath);
//     const file = record.file;
//     const filePath = path.join(currentDirPath, `../${file}`);
//     res.download(filePath);
//   } catch (error) {
//     console.error("Error downloading health record file:", error);
//     res.status(500).json({ error: "Failed to download health record file." });
//   }
// };

// // Patient removing health record
// export const removeHealthRecord = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     jwt.verify(token, "supersecret", async (err, decodedToken) => {
//       if (err) {
//         res.status(400).json({ message: "You are not logged in." });
//       } else {
//         const username = decodedToken.username;
//         const { recordId } = req.params; // Assuming the record ID is passed as a URL parameter

//         // Find the patient and pull the health record from the array
//         const updatedPatient = await patientModel.findOneAndUpdate(
//           { username },
//           { $pull: { healthrecords: { _id: recordId } } },
//           { new: true }
//         );

//         if (!updatedPatient) {
//           // If the patient is not found or the health record does not exist
//           return res.status(404).json({ message: "Health record not found." });
//         }

//         res
//           .status(200)
//           .json({ message: "Health record removed successfully." });
//       }
//     });
//   } catch (error) {
//     console.error("Error removing health record:", error);
//     res.status(400).json({ error: "Failed to remove health record." });
//   }
// };

// //view health records for the current patient logged in
// export const viewHealthRecords = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     jwt.verify(token, "supersecret", async (err, decodedToken) => {
//       if (err) {
//         res.status(400).json({ message: "You are not logged in." });
//       } else {
//         const username = decodedToken.username;
//         const patient = await patientModel.findOne({ username });
//         const healthrecords = patient.healthrecords;
//         res.status(200).json(healthrecords);
//       }
//     });
//   } catch (error) {
//     console.error("Error retrieving health records:", error);
//     res.status(500).json({ error: "Failed to retrieve health records." });
//   }
// }

//  //helping func
//  //view all patients there is
//  export const viewAllPatients = async (req,res) => {
//   const patients = await patientModel.find({});
//   res.json(patients);
// }
// export const viewAllDoctors = async (req,res) => {
//   const doctors = await doctorModel.find({});
//   res.json(doctors);
// }

// export const payAppointment = async (req, res) => {
//   const { healthPackage } = req.body;
//   const { price } = req.body;
//   healthPackage = healthPackage.toLowerCase();
//   if ( healthPackage == 'silver' )
//     price = (price * 1.1) - (price * 1.4);
//   else if ( healthPackage == 'gold' )
//     price = (price * 1.1) - (price * 1.6);
//   else if ( healthPackage == 'platinum' )
//     price = (price * 1.1) - (price * 1.8);
//   else 
//   price = (price * 1.1);
//   const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: [{
//         price_data: {
//             currency: 'egp', // or your preferred currency
//             product_data: {
//                 name: `Doctor's Appointment`,
//             },
//             unit_amount: price * 100, // convert to cents
//         },
//         quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: `http://localhost:3000/patient/home`,
//     cancel_url: `http://localhost:3000/patient/home`,
//   });
//   res.redirect(303, session.url);
//  };
//  export const payPackage = async (req, res) => {
//   const { patient , packageType , familyNationalID , familySubscription }= req.body;
//   let price = 0;
//   const healthPackage = packageType.toLowerCase();
//   let name = '';
//   //const url = 'http://localhost:4000/api/patient/success-payment/patient?='+patient+'/packageType='+packageType+'/familyNationalID='+familyNationalID+'/familySubscription='+familySubscription ;
//   if ( healthPackage == 'silver' )
//   {
//     name = 'Silver Health Package'
//     price = 3600;
//   }
//   else if ( healthPackage == 'gold' )
//   {
//     name = 'Gold Health Package'
//     price = 6000;
//   }  
//   else if ( healthPackage == 'platinum' )
//   {
//     name = 'Platinum Health Package'
//     price = 9000 ;
//   }
//   const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: [{
//         price_data: {
//             currency: 'egp', // or your preferred currency
//             product_data: {
//                 name: name,
//             },
//             unit_amount: price * 100, // convert to cents
//         },
//         quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: 'http://localhost:3000/patient/home',
//     cancel_url: `http://localhost:3000/patient/home`,
//   });
//   res.json({url:session.url});
//  }

//    export const reserveappointment = async (req, res) => {
//  try {
//    const token = req.cookies.jwt;
//     jwt.verify(token, "supersecret", async (err, decodedToken) => {
//       if (err) {
//         res.status(400).json({ message: "You are not logged in." });
//       } else {
//         console.log("test")
//         const {  selectedUser, appointment,reservetype } = req.body;
//         const username = decodedToken.username;
//         console.log(username)
//         const patient =await patientModel.findOne({username : username});
//         const doctor =await doctorModel.findById(selectedUser._id);
//         console.log(doctor.username)
//         if (!patient || !doctor) {
//           return res.status(404).json({ message: 'Patient or doctor not found.' });
//         }
//         console.log(patient.username)
//         patient.appointments.push({
//           date: new Date(appointment.date),
//           status: 'reserved',
//           doctor: doctor._id,
//           type : reservetype
//         });
//         doctor.appointments.push({
//           date: new Date(appointment.date),
//           status: 'reserved',
//           patient: patient._id,
//           type: reservetype
//         });
//         patient.chats.push({
//           firstPerson: patient.username,
//           secondPerson: doctor.username,
//           messages:[]
//         });
//         doctor.chats.push({
//           firstPerson: doctor.username,
//           secondPerson: patient.username,
//           messages:[]
//         });
//         await patient.save();
//         await doctor.save();
//         res.status(200).json({ error: 'Appointment reserved successfully.' });

//       }
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

// }


// export const getWallet = async (req,res) => {
//       const token = req.cookies.jwt;
//       jwt.verify(token, "supersecret", async (err, decodedToken) => {
//         const username = decodedToken.username;
//         const patient = await patientModel.findOne({ username: username });
//         res.json(patient.wallet);
//     });
//  }

//  export const linkFamily = async (req, res) => {
//    const token = req.cookies.jwt;

//    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
//      if (err) {
//        res.status(400).json({message:"You are not logged in."})
//      } else {
//        const username = decodedToken.username ;
//     try {

//     const {role,email,number} = req.body; // The new family member data from the request body

//     // Find the patient by username
//     const patient = await patientModel.findOne({ username: username });
//     let familyMember = await patientModel.findOne({email:email}); 
//     if(!familyMember)
//     familyMember = await patientModel.findOne({phoneNumber:number})
//     if (!familyMember)
//       return res.status(404).json({ message: "Patient not found" });
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }
//     familyMember = await patient.familyMembers.create(
//       {
//         relationToPatient: role,
//         name: familyMember.name,
//         gender: familyMember.gender,
//         age: familyMember.dob
//       }
//     )
//     // Add the new family member to the patient's familyMembers array
//     patient.familyMembers.push(familyMember);

//     // Save the updated patient document
//     await patient.save();

//     res.status(200).json(patient);
//   } catch (error) {
//     console.error("Error adding family member:", error);
//     res.status(400).json({ message: "Internal server error" });
//   }
// }
// });
// };
// export const payAppointment2 = async (req, res) => {
//   let price = 100;
//   let name = `Doctor's Appointment`
//   const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: [{
//         price_data: {
//             currency: 'egp', // or your preferred currency
//             product_data: {
//                 name: name,
//             },
//             unit_amount: price * 100, // convert to cents
//         },
//         quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: `http://localhost:3000/patient/home`,
//     cancel_url: `http://localhost:3000/patient/home`,
//   });
//   res.redirect(303, session.url);
//  };
//  export const payPackage2 = async (req, res) => {
//   let price = 9000;
//   let name = `Platinum Package`
//   const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: [{
//         price_data: {
//             currency: 'egp', // or your preferred currency
//             product_data: {
//                 name: name,
//             },
//             unit_amount: price * 100, // convert to cents
//         },
//         quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: `http://localhost:3000/patient/home`,
//     cancel_url: `http://localhost:3000/patient/home`,
//   });
//   res.redirect(303, session.url);
//  };


