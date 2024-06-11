import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./database.js";
import path from "path";
import { fileURLToPath } from 'url';

// importing Routes
import employeeRoutes from "./routes/employeeRoutes.js";

// Setup __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(cors());

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error syncing database", err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Working fine...");
});

// Routes
app.use("/api/v1/employee", employeeRoutes);

app.listen(2000, () => console.log("Server running on port 2000"));
