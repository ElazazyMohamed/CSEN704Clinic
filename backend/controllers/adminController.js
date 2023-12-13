import { validatePassword } from "./userController.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";
import pharmacistModel from "../models/pharmacistModel.js";
import patientModel from "../models/patientModel.js";

// (Req 7) As an admin add another adminstrator with a set username and password
export const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const passwordValidation = validatePassword(password);
    if(passwordValidation) {
        return res.status(400).json(passwordValidation);
    }

    await userModel.create({ username, password, role:"Admin" });
    await adminModel.create({ username });

    return res.status(200).json({message: "Admin added successfully"});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 8) As an admin remove a admin / doctor/ pharmacist / patient from the system
export const removeUser = async (req, res) => {
  try {
    const{ username } = req.body;

    const removedUser = await userModel.findOneAndDelete({ username: username});
    if(!removedUser) {
      return res.status(400).json({error: "User does not exist"});
    }
    if(removedUser.role === "Admin") {
      await adminModel.findOneAndDelete({ username: username});
      return res.status(200).json({ message: "Admin removed successfully" });
    } else {
      if(removedUser.role === "Doctor") {
        await doctorModel.findOneAndDelete({ username: username});
        return res.status(200).json({ message: "doctor removed successfully" });
      } else {
        if(removeUser.role === "Pharmacist") {
          await pharmacistModel.findOneAndDelete({ username: username});
          return res.status(200).json({ message: "Pharmacist removed successfully" });
        } else {
          await patientModel.findOneAndDelete({ username: username});
          return res.status(200).json({ message: "Patient removed successfully" });
        }
      }
    }
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 9) As an admin view all of the information uploaded by a doctor to apply to join the platform
export const getRegisteredDoctorsRequests = async (req, res) => {
  try {
    const registeredDoctors = await doctorModel.find({ status: "registered" });
    if(registeredDoctors.length === 0) {
      return res.status(200).json({ message: "There is no registered doctors" })
    }
    return res.status(200).json(registeredDoctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 7) As an admin view all of the information uploaded by a pharmacist to apply to join the platform
export const getRegisteredPharmacistsRequests = async(req, res) => {
  try {
    const registeredPharmacists = await pharmacistModel.find({ status: "registered" });
    if(registeredPharmacists.length === 0) {
      return res.status(200).json({ message: "There is no registered pharmacists" })
    }
    return res.status(200).json(registeredPharmacists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 15) As an admin accept a request for the registration of a doctor
export const acceptRegisteredDoctor = async (req, res) => {
  try {
    const { username } = req.params;
    let employmentContract = {
      markup: 25,
      doctorAcceptance: false,
      adminAcceptance: false,
    };
    const doctor = await doctorModel.findOne({ username: username });
    doctor.employmentContract = employmentContract;
    doctor.save();
    return res.status(200).json({message: "Doctor registration is accepted, waiting for your to accept employment contract"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 8) accept the request of a pharmacist to join the platform
export const acceptRegisteredPharmacist = async(req, res) => {
  try {
    const { username } = req.params;
    const pharmacist = await pharmacistModel.findOne({ username: username });
    pharmacist.status = "accepted";
    pharmacist.save();
    return res.status(200).json({message: "Pharmacist registration is accepted, now you are a pharmacist"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 8) reject the request of a pharmacist to join the platform
export const rejectRegisteredPharmacist = async(req, res) => {
  try {
    const { username } = req.params;
    const pharmacist = await pharmacistModel.findOne({ username: username });
    pharmacist.status = "rejected";
    pharmacist.save();
    return res.status(200).json({message: "Pharmacist registration is rejected"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 10) helper
export const getPendDoctorRequests = async (req, res) => {
  try {
    const pendingDoctors = await doctorModel.find({ status: "pending" });
    if(pendingDoctors.length === 0) {
      return res.status(200).json({ message: "There is no pend doctors" })
    }
    return res.status(200).json(pendingDoctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 10) accept the request of a doctor to join the platform
export const acceptPendDoctor = async (req, res) => {
  const { doctorusername } = req.params;
  try {
    const doctor = await doctorModel.findOne({ username: doctorusername });
    doctor.employmentContract.adminAcceptance = true;
    doctor.status = "accepted";
    return res.status(200).json({message: "Employment contract is now approved, you are now a Doctor"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 10) reject the request of a doctor to join the platform
export const rejectPendDoctor = async (req, res) => {
  const { doctorusername } = req.params;
  try {
    const doctor = await doctorModel.findOne({ username: doctorusername});
    doctor.employmentContract.adminAcceptance = false;
    doctor.status = "rejected";
    return res.status(200).json({message: "Employment contract was not approved, you are now rejected"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 23) view a patients's basic information
export const viewPatientInfo = async(req, res) => {
  try {
    const { username } = req.body;
    const patient = await patientModel.findOne({ username: username });
    if(!patient) {
      return res.status(400).json({ message: "Patient is not found"});
    }

    let info = {
      name: patient.name,
      email: patient.email,
      dob: patient.dob,
      gender: patient.gender,
      phoneNumber: patient.phoneNumber,
      emergencyContactFullName: patient.emergencyContact.fullName,
      emergencyContactRelation: patient.emergencyContact.relation,
      emergencyContactNumber: patient.emergencyContact.phoneNumber
    };
    return res.status(200).json(info);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 22) view a pharmacist's information
export const viewPharmacistInfo = async(req, res) => {
  const { username } = req.body;
  const pharmacist = await pharmacistModel.findOne({ username: username });
  if(!pharmacist) {
    return res.status(400).json({ message: "Patient is not found"});
  }

  let info = {
    name: pharmacist.name,
    email: pharmacist.email,
    dob: pharmacist.dob,
    hourlyRate: pharmacist.hourlyRate,
    affiliation: pharmacist.affiliation,
    educationBg: pharmacist.educationBg,
    status: pharmacist.status
  };
  return res.status(200).json(info);
};