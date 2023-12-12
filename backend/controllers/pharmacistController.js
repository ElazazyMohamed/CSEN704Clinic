// import doctorModel from "../models/pharmacistModel.js";
// import medicineModel from "../models/medicineModel.js"
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, "uploads/"); //store uploaded documents
//   },
//   filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
// export const createPharmacist = async (req, res) => {
//   const {
//     username,
//     name,
//     email,
//     password,
//     dob,
//     gender,
//     phoneNumber,
//     hourlyRate,
//     affiliation,
//     educationBg
//   } = req.body;
  
//  // Handle file uploads for documents
// //  upload.fields([
// //   { name: "idDocument", maxCount: 1 },
// //   { name: "pharmacyDegreeDocument", maxCount: 1 },
// //   { name: "workingLicenseDocument", maxCount: 1 },
// // ])(req, res, async (err) => {
// //   if (err) {
// //       return res.status(400).json({ error: "File upload error." });
// //   }

// //   // Get file paths from the uploaded documents
// //   const idDocument = req.files["idDocument"][0].path;
// //   const pharmacyDegreeDocument = req.files["pharmacyDegreeDocument"][0].path;
// //   const workingLicenseDocument = req.files["workingLicenseDocument"][0].path;

//   try {
//     const doctor = await pharmacistModel.create({
//       username,
//       name,
//       email,
//       password,
//       dob,
//       gender,
//       phoneNumber,
//       hourlyRate,
//       affiliation,
//       educationBg,
//       // idDocument,
//       // pharmacyDegreeDocument,
//       // workingLicenseDocument,
//     });
//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // req.16 , add medicine 
// export const addMedicine = async (req, res) => {
//   const { name , ingredients , price , quantity } = req.body;
//   if (quantity < 1) {
//       return res.status(400).json({ message: "Quantity must be greater than 0" });
//   }
//   try{const medicine = await medicineModel.findOne({ name });
//   if (medicine) {
//       const newQuantity = parseInt(medicine.quantity) + parseInt(quantity);
//       await medicineModel.findOneAndUpdate({ name }, { quantity: newQuantity }, { new: true });
//       return res.status(200).json({ message: "Medicine quantity updated  successfully" });
//   }else if(!medicine && (!ingredients || !price )){
//       return res.status(400).json({ message: "since you are adding a medicine that does not exist in the database you must provide ingredients and price" });
//   }else{
//       const newMedicine = new medicineModel({ name , ingredients , price , quantity });
//       await newMedicine.save();
//       return res.status(200).json({ message: "Medicine added successfully" });
//   }}
//   catch(err){
//       return res.status(500).json({ message: err.message });
//   }
// }

// // req. 13 , view only the availabe quantity and sales of each medicine
// export const viewMedicineQS = async (req, res) => {
//   try{const medicine = await medicineModel.find();
//       const medicineQS = medicine.map(medicine => ({ name: medicine.name, quantity: medicine.quantity, sales: medicine.sales }));
//       return res.status(200).json({ medicineQS });}
//       catch(err){
//           return res.status(500).json({ message: err.message });
//       }
// }

// // req. 18 , edit medicine details(active ingredients) and price
// export const editMedicineIandP = async (req, res) => {
//   const { name , ingredients , price } = req.body;
//   try{const medicine = await medicineModel.findOne({ name });
//   if (medicine) {
//       await medicineModel.findOneAndUpdate({ name }, { ingredients , price }, { new: true });
//       return res.status(200).json({ message: "Medicine ingredients and price updated successfully" });
//   }else{
//       return res.status(400).json({ message: "Medicine does not exist in the database" });
//   }}
//   catch(err){
//       return res.status(500).json({ message: err.message });
//   }
// }

// //taha’s extra trial function
// export const createMedicine = async (req, res) => {
//   const {
//     medicineName,
//     medicinePrice,
//     medicineIngredients,
//     medicineQuantity,
//     medicineImage
//   } = req.body;
//   try {
//     const medicine = await medicineModel.create({
//       name: medicineName,
//       price: medicinePrice,
//       ingredients: medicineIngredients,
//       quantity: medicineQuantity,
//       image: medicineImage
//     });
//     res.status(200).json(medicine);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getMedicines = async (req, res) => {
//   try {
//     const medicines = await medicineModel.find();
//     res.status(200).json(medicines);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

// export const fetchPharmacist = async (req, res) => {
//   try {
//     const doctors = await doctorModel.find();
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

// export const deletePharmacist = async (req, res) => {
//   const { username } = req.body;

//   try {
//     const deletedUser = await doctorModel.findOneAndDelete({ username });
//     res.status(200).json(deletedUser);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

// // Define an asynchronous function to search for medicines based on a provided name
// export const searchMedicine = async (req, res) => {
//   // Extract the 'name' parameter from the query string of the request
//   const { name } = req.query;

//   try {
//     // Log the search 'name' to the console for debugging purposes
//     console.log("name:", String(name));

//     // Search for medicines in the database that match the provided 'name' using a case-insensitive regex
//     const medicines = await medicineModel.find({ name: { $regex: name, $options: 'i' }});

//     // If no medicines are found, return a 404 Not Found response
//     if (medicines.length === 0) {
//       return res.status(404).json({ message: 'No medicines found.' });
//     }

//     // If medicines are found, return a 200 OK response with the list of medicines
//     res.status(200).json(medicines);
//   } catch (err) {
//     // If an error occurs during the search, log the error to the console
//     console.error(err);
    
//     // Return a 500 Internal Server Error response to indicate a server error
//     res.status(500).json({ message: err.message });
//   }
// };