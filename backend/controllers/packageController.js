import packageModel from "../models/packageModel.js";
import patientModel from "../models/patientModel.js";

// (Req 11) add/update/delete health packages with different price ranges depending on the services included in each package ( silver, gold, platinum).
// (Silver Package): patient pays 3600 LE per year and gets 40% off any doctor's session price and 20% off any medicin ordered from pharmacy platform and 10% discount on the subscribtion of any of his family members in any package
// (Gold Package): patient pays 6000 LE per year and gets 60% off any doctor's session price and 30% off any medicin ordered from pharmacy platform and 15% discount on the subscribtion of any of his family members in any package
// (Platinum Package): patient pays 9000 LE per year and gets 80% off any doctor's session price and 40% off any medicin ordered from pharmacy platform and 20% discount on the subscribtion of any of his family members in any package
export const addPackage = async (req, res) => {
  try {
    const { type, price, clinicDiscount, pharmacyDiscount, familyDiscount } = req.body;
    const packages = await packageModel.create({ type, price, clinicDiscount, pharmacyDiscount, familyDiscount });
    return res.status(200).json({message: type + " package is created successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  const { type, price, clinicDiscount, pharmacyDiscount, familyDiscount } = req.body;
  const updateFields = {};

  // Check if price is provided and update it
  if (price !== undefined && price !== "") {
    updateFields.price = price;
  }
  // Check if clinicDiscount is provided and update it
  if (clinicDiscount !== undefined && clinicDiscount !== "") {
    updateFields.clinicDiscount = clinicDiscount;
  }
  // Check if pharmacyDiscount is provided and update it
  if (pharmacyDiscount !== undefined && pharmacyDiscount !== "") {
    updateFields.pharmacyDiscount = pharmacyDiscount;
  }
  // Check if familyDiscount is provided and update it
  if (familyDiscount !== undefined && familyDiscount !== "") {
    updateFields.familyDiscount = familyDiscount;
  }

  try {
    const updatedPackage = await packageModel.findOneAndUpdate(
      { type },
      updateFields,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    return res.status(200).json({message: type + " package updatted successfully"});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  const { type } = req.body;
  try {
    const deletedPackage = await packageModel.findOneAndDelete({ type });
    if (!deletedPackage) {
      return res.status(400).json({ error: type + " Package does not exist" });
    }
    return res.status(200).json({message: type + " package is deleted successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getPackages = async (req, res) => {
  try {
    const packages = await packageModel.find();
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const subscribePackage = async (req, res) => {
  const { packageType, patient, familyNationalID, familySubscription } =
    req.body;
  try {
    const patientGotten = await patientModel.findOne({
      username: patient.username,
    });
    if (familySubscription) {
      patientGotten.familyMembers.forEach((familyMember) => {
        if (familyMember.nationalID === familyNationalID) {
          if (packageType && familyMember.packageType !== null) {
            return res
              .status(400)
              .json({ error: "Family Member Already Subscribed" });
          }
          familyMember.packageType = packageType;
        }
      });
    } else {
      if (packageType !== null && patientGotten.packageType !== null) {
        return res.status(400).json({ error: "Patient Already Subscribed" });
      } else {
        patientGotten.packageType = packageType;
      }
    }
    res.status(200).json(await patientGotten.save());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
