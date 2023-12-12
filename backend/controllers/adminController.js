import { validatePassword } from "./userController.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";

// (Req 7) As a adminstrator add another adminstrator with a set username and password
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

// (Req 8) As a adminstrator remove a doctor/ patient / Admin from the system
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
        await patientModel.findOneAndDelete({ username: username});
        return res.status(200).json({ message: "Patient removed successfully" });
      }
    }
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 9) view all of the information uploaded by a doctor to apply to join the platform
export const getRegisteredDoctorRequests = async (req, res) => {
  try {
    const RegisteredDoctors = await doctorModel.find({ status: "registered" });
    if(RegisteredDoctors.length === 0) {
      return res.status(200).json({ message: "There is no registered doctors" })
    }
    return res.status(200).json(RegisteredDoctors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

// (Req 15) accept a request for the registration of a doctor
export const acceptRegisteredDoctor = async (req, res) => {
  const { username } = req.params;
  try {
      const doctor = await doctorModel.findOneAndUpdate(
          { username },
          { status: "pending" },  // previous registered next pending 
          { new: true }
      );
      return res.status(200).json({message: "Doctor registration is accepted wait, you are now pending until reviewing your uploads"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// (Req 10) accept or reject the request of a doctor to join the platform
export const acceptPendDoctor = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "approved" }, // previous pending next approved
      { new: true }
    );
    return res.status(200).json({message: "Doctor uploads was accepted, you are now approved"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const rejectPendDoctor = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "rejected" }, // previous pending next approved
      { new: true }
    );
    return res.status(200).json({message: "Doctor uploads was rejected, you are now rejected"});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
