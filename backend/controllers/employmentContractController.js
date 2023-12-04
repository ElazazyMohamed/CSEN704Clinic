import EmploymentContract from "../models/employmentContractModel.js";

export const viewContract = async (req, res) => {
  const { doctorId, clinicId } = req.params;

  try {
    const contract = await EmploymentContract.findOne({
      doctor: doctorId,
      clinic: clinicId,
    });

    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const acceptContract = async (req, res) => {
  const { doctorId, clinicId } = req.params;

  try {
    const contract = await EmploymentContract.findOneAndUpdate(
      { doctor: doctorId, clinic: clinicId, status: "pending" },
      { status: "approved" },
      { new: true }
    );

    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
