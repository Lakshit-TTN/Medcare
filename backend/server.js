import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passportConfig.js";
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./routes/doctors.js";
import appointmentRoutes from "./routes/appointments.js";
import adminRoutes from "./routes/admin.js";
import upload from "./routes/upload.js";
import user from "./routes/user.js";
import { authenticateAdmin } from "./middleware/isAdmin.js";
import authenticateUser from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/doctors",authenticateUser ,doctorRoutes );
app.use("/api/appointments",appointmentRoutes);
app.use("/api/admin",authenticateAdmin,adminRoutes);
app.use("/api",upload);
app.use("/api/user",user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
