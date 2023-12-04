import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";

export const createAdmin = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {
    const admin = await adminModel.create({
      username,
      password
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const deleteAdmin = async (req, res) => {
  const{username}=req.body;
  try {
    const deletedUser = await adminModel.findOneAndDelete({ username});
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
//10
// Get a list of pending doctor registration requests
export const getPendingDoctorRequests = async (req, res) => {
  try {
    const pendingDoctors = await doctorModel.find({ status: "pending" });
    res.status(200).json(pendingDoctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a doctor request
export const acceptDoctorRequest = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a doctor request
export const rejectDoctorRequest = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//15
// Accept a doctor request
export const acceptDoctorRequestReg = async (req, res) => {
  const { username } = req.params;
  try {
      const doctor = await doctorModel.findOneAndUpdate(
          { username },
          { status: "accepted" },  // Update the status to "accepted"
          { new: true }
      );
      res.status(200).json(doctor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
