import userModel from "../models/userModel.js";
import patientModel from "../models/patientModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import multer from "multer";
import fs from 'fs/promises';
import path from 'path';
import { Console } from "console";
import stripe from "stripe";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// (Req 18) As a patient add family members using name, National ID, age, gender and relation to the patient 
export const addFamilyMember = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
          const patientusername = decodedToken.username;
          const { name, nationalId, age, gender, relation } = req.body;

          const newFamilyMember = {
            name: name,
            nationalId: nationalId,
            age: age,
            gender: gender,
            relation: relation,
          }

          const patient = await patientModel.findOne({ username: patientusername });
          patient.family.members.push(newFamilyMember);
          await patient.save();

          return res.status(200).json({message: "FamilyMember Added Successfully"});
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 22) As a patient view registered family members
export const getFamilyMembers = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async(err, decodedToken) => {
      if(err) {
        return res.status(400).json({err : err.message});
      } else {
        const patientusername = decodedToken.username;
        const patient = await patientModel.findOne({username: patientusername});
        
        const familyMembers = patient.family.members;

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

        const doctors = await doctorModel.find().select(
          "name requiredDocuments.speciality hourlyRate"
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

// (Req 38) As a patient search for a doctor by name and/or speciality
export const getDoctorNameSpeciality = async (req, res) => {
  try {
    const { doctorName, speciality } = req.body;

    if(!doctorName && !speciality) {
      return res.status(400).json({ message: "you need to enter a doctor name and/or speciality to search" });
    }

    let doctor;
    if(doctorName && speciality) {
      doctor = await doctorModel.findOne({
        $or: [
          { name: doctorName },
          { speciality: speciality }
        ]
      });
    } else {
      if(doctorName) {
        doctor = await doctorModel.findOne({ name: doctorName });
      } else {
        doctor = await doctorModel.findOne({ "requiredDocuments.speciality": speciality });
      }
    }

    if (doctor) {
      return res.status(200).json({ doctor });
    } else {
      return res.status(404).json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 39) As a patient filter a doctor by speciality and/or availability on a certain date and at a specific time
export const filterDoctorsSpecialityAvailability = async (req, res) => {
  try {
    const { speciality, date, slot } = req.body;
    
    if(!speciality && !date && !slot) {
      return res.status(400).json({ message: "you need to enter a speciality and/or date and slot to filter doctors" });
    }
    let doctors;
    if(speciality && date && slot) {
      doctors = await doctorModel.find(
        {
          "requiredDocuments.speciality": speciality,
          $and: [
            {
              workingSlots: {
                $elemMatch: {
                  day: newDate.getDay,
                  slot: slot,
                }
              }
            },
            {
              $nor: [{
                "appointments.appointment": {
                  $elemMatch: {
                    date: newDate,
                    slot: slot,
                    status: "upcoming",
                  }
                }
              }]
            }
          ]
        }
      );
    } else {
      if(speciality) {
        doctors = await doctorModel.find({ "requiredDocuments.speciality": speciality });
      } else {
        let newDate = new Date(Date);
        let time;
        switch (slot) {
          case "1st":
            time = "T09:00:00Z";
            break;
          case "2nd":
            time = "T10:45:00Z";
            break;
          case "3rd":
            time = "T12:30:00Z";
            break;
          case "4th":
            time = "T14:30:00Z";
            break;
          case "5th":
            time = "T16:30:00Z";
            break;
          default:
            throw new Error("Invalid slot value: " + slot);
        }
        newDate = newDate.toISOString().substring(0, 10);
        newDate = newDate + time;
        
        doctors = await doctorModel.find(
          { 
            $and: [
              {
                workingSlots: {
                  $elemMatch: {
                    day: newDate.getDay,
                    slot: slot,
                  }
                }
              },
              {
                $nor: [{
                  "appointments.appointment": {
                    $elemMatch: {
                      date: newDate,
                      slot: slot,
                      status: "upcoming",
                    }
                  }
                }]
              }
            ]
          }
        );
      }
    }
    if (doctors && doctors.length > 0) {
      return res.status(200).json({ doctors });
    } else {
      res.status(404).json({ message: "No available doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// (Req 40) As a patient select a doctor from the search/filter results, 
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

// (Req 41) As a patient view all details of selected doctor including specilaty, affiliation (hospital), educational background
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
        const patients = await patientModel.findOne({ username: patientusername });
        if(!patients || patients.length <= 0) {
          return res.status(400).json({message: "You have no prescriptions"})
        }
        return res.status(200).json({ "prescriptions": patients.prescriptions });
      }
    }); 
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 55) As a patient filter prescriptions based on date or doctor or filled or unfilled
export const filterPrescription = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ err: err.message });
      } else {
        const patientusername = decodedToken.username;
        const { date, doctor, filled } = req.body;
        if(!date && !doctor && !filled) {
          return res.status(400).json({message: "You must add a filter on date or doctor or filled"});
        }
        let patient;
        let newDate = new Date(Date);
        let time = "T00:00:00Z";
        newDate = newDate.toISOString().substring(0, 10);
        newDate = newDate + time;

        patient = await patientModel.find(
          {
            $and: [
              { "username": patientUsername },
              {
                $or: [
                  { "prescriptions.prescription.date": date },
                  { "prescriptions.prescription.doctor": doctor },
                  { "prescriptions.prescription.filled": filled },
                ]
              }
            ]
          }
        );
        return res.status(200).json({ prescriptions: patient.prescriptions});
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 56) As a patient select a prescription from my list of perscriptions
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

// (Req 2) patient upload documents (PDF,JPEG,JPG,PNG) for my medical history
export const uploadHealthRecord = async (req, res) => {
    // Configure Multer storage
    const storageForPatients = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/patient");
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
      },
    });
  
    // configure file filtering 
    const fileFilterForPatients = (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || 
          file.mimetype === "image/jpg" || 
          file.mimetype === "image/png" || 
          file.mimetype === "application/pdf") {
          cb(null, true);
      } else {
          cb(null, false);
      }
    };
  
    // Create Multer upload middleware
    const myUpload = multer({ storage: storageForPatients, limits: 
      {
          fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilterForPatients }).fields([
        { name: 'medicalHistory', maxCount: 1 }
      ]);
  
  try {
    myUpload(req, res, async (err) => {
      const token = req.cookies.jwt;
      jwt.verify(token, "supersecret", async (err, decodedToken) => {
        if (err) {
          return res.status(400).json({ message: "You are not logged in." });
        } else {
          const pharmacistusername = decodedToken.username;

          if (!req.files || !req.files.medicalHistory) {
              return res.status(400).json({ error: 'Medical history file is required)' });
          }

          const patientusername = decodedToken.username;
          const { date, description, doctorNotes } = req.body;
          const uploadedBy = patientusername;
          const file = req.files.medicalHistory[0].path;
          const newHealthRecord = { date, uploadedBy, description, file, doctorNotes };

          const patient = await patientModel.findOne({ username: patientusername});
          patient.health.records.push(newHealthRecord);
          await patient.save();
          return res.status(200).json({ message: "Health record added successfully" });
       }
      });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 24) helper to delete health records
export const viewHealthRecords = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: "You are not logged in." });
      } else {
        const patientusername = decodedToken.username;

        const patient = await patientModel.findOne({ username: patientusername});

        if(!patient) {
          return res.status(404).json({ "message": "no health records available." });
        }
        return res.status(200).json({ "Health Records": patient.health.records });
      }
    });
  } catch (error) {
    return res.status(400).json({ "error": "Failed to remove health record." });
  }
};

// (Req 2) As a patient remove documents (PDF,JPEG,JPG,PNG) for my medical history
export const removeHealthRecord = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: "You are not logged in." });
      } else {
        const patientusername = decodedToken.username;
        const { recordIndex } = req.params;

        const patient = await patientModel.findOne({ username: patientusername});
        
        if (recordIndex < 0 || recordIndex >= patient.health.records.length) {
          return res.status(400).json({ message: 'Invalid record index.' });
        }

        patient.health.records.splice(recordIndex, 1);
        await patient.save();

        return res.status(200).json({ message: 'Health record deleted successfully.' });
      }
    });
  } catch (error) {
    return res.status(400).json({ "error": "Failed to remove health record." });
  }
};

// (Req 45) view a list of all my upcoming / past appointments
export const getAppointments = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const patientusername = decodedToken.username;
        const patient = await patientModel.findOne({ username: patientusername });
        const appointments = patient.appointments;
        return res.status(200).json(appointments);
      }
    });
  } catch (error) {
    return res.status(400).json({ "error": "Failed to retrieve health records." });
  }
};

// (Req 46) filter appointments by date or status (upcoming, completed, cancelled, rescheduled)
export const filterAppointmentsDateStatus = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: "You are not logged in." });
      } else {
        const patientusername = decodedToken.username;
        const { date, status } = req.body;
        const patient = await patientModel.findOne({ username: patientusername });

        let filteredAppointments = patient.appointments.map((appointment) => ({
          date: appointment.date.toISOString(),
          status: appointment.status,
          doctorName: appointment.doctor.name,
          type: appointment.type,
        }));

        if (status !== undefined && status !== "" && status !== null) {
          filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === status);
        }
        if (date !== undefined && date !== "" && date !== null) {
          filteredAppointments = filteredAppointments.filter((appointment) => appointment.date === date);
        }

        if (filteredAppointments.length === 0) {
          return res.status(400).json({ message: "There is no matching appointment" });
        } else {
          return res.status(200).json(filteredAppointments);
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ "error": "Failed to retrieve health records." });
  }
};

// (Req 67) view the amount in my wallet
export const getWallet = async (req,res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      const username = decodedToken.username;
      const patient = await patientModel.findOne({ username: username });
      return res.json(patient.wallet);
    });
  } catch (error) {
    return res.status(400).json({ "error": "Failed to get amount in wallet" });
  }
};

// (Req 19) As a patient link another patient's account as a family member using email or phone number stating relation to the patient
export const linkFamily = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({message:"You are not logged in."})
      } else {
        const patientusername = decodedToken.username ;
        const { email, phoneNumber, relation } = req.body;

        const patient = await patientModel.findOne({ username: patientusername });
        let familyMember;

        if(!email && !phoneNumber) {
          return res.status(200).json({ message: "an email or phone number is required to link the account"});
        }
        if(!email) {
          familyMember = await patientModel.findOne({ phoneNumber: phoneNumber });
        }
        if(!phoneNumber) {
          familyMember = await patientModel.findOne({ email: email });
        }

        if(!familyMember) {
          return res.status(400).json({ message: "There is no such user exist" });
        }

        function calculateAge(birthDate) {
          const currentDate = new Date();
          const birthYear = birthDate.getFullYear();
          const currentYear = currentDate.getFullYear();
          const hasBirthdayOccurred = (
            currentDate.getMonth() > birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
          );
          const age = currentYear - birthYear - (hasBirthdayOccurred ? 0 : 1);
          return age;
        }

        const familyAge = calculateAge(familyMember.dob);
        const myAge = calculateAge(patient.dob);

        let inverseRealtion;
        if(relation === "wife") {
          inverseRealtion = "husband";
        }
        if(relation === "husband") {
          inverseRealtion = "wife";
        }
        if(relation === "parent") {
          inverseRealtion = "child";
        }
        if(relation === "child") {
          inverseRealtion = "parent";
        }
        if(relation === "sibling") {
          inverseRealtion = "sibling";
        }

        const me = {
          name: patient.name,
          age: myAge,
          gender: patient.gender,
          relation: relation
        };

        const member = {
          name: familyMember.name,
          age: familyAge,
          gender: familyMember.gender,
          relation: inverseRealtion
        };

        patient.family.members.push(member);
        patient.save();

        familyMember.family.members.push(me);
        familyMember.save();

        return res.status(200).json({ "Message": "familyMember added successfully" });
     }
    });
  } catch (error) {
    return res.status(400).json({ "error": "Failed to link a family Member" + error });
  }
};

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
    if( healthPackage == 'silver' ) {
      name = 'Silver Health Package'
      price = 3600;
    }
    if( healthPackage == 'gold' ) {
      name = 'Gold Health Package'
      price = 6000;
    }
    if( healthPackage == 'platinum' ) {
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
    return res.json({url:session.url});
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




// // 2



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





