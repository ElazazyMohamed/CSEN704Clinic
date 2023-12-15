import multer from "multer";
import fs from "fs";

const uploadPath = "uploads"; // define your upload path

export const storage = (pathString) => multer.diskStorage({
  destination: function(req, file, cb) {
    const path = uploadPath + "/" + pathString;
    if(!fs.existsSync(path)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, path);
  },
  filename: function(req, file, cb) {

    cb(null, new Date().toISOString()+'-'+ file.origi);
  },
});

export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = (pathString) => multer({
  storage: storage(pathString),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default upload;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Ensure the destination folder exists; create it if not
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const uploadMiddleware = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });
