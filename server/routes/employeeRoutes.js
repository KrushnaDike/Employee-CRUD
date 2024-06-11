import Express from "express";
import multer from "multer";
import path from "path";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployees,
  getSingleEmployee,
  testing,
} from "../controller/employeeController.js";

// Multer setup for uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default Express.Router()

  .get("/pro", testing)

  .post(
    "/createEmployee",
    upload.fields([{ name: "photo" }, { name: "document" }]),
    createEmployee
  )

  .get("/getAllEmployees", getAllEmployees)

  .put(
    "/editEmployee/:id",
    upload.fields([{ name: "photo" }, { name: "document" }]),
    editEmployee
  )

  .delete("/deleteEmployee/:id", deleteEmployee)
  .get("/getSingleEmployee/:id", getSingleEmployee);
