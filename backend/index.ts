import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerUser, loginUser } from "./src/controllers/authController";
import {
  createShipment,
  trackShipment,
} from "./src/controllers/shipmentController";
import {
  getUserShipments,
  userShipmentDelete,
  userUpdateShipment,
} from "./src/controllers/userController";
import {
  getAllShipments,
  adminShipmentDelete,
  updateShipmentStatus,
  getShipmentStatus,
  adminUpdateShipment,
} from "./src/controllers/adminController";
import {
  authenticateUser,
  authorizeAdmin,
} from "./src/middleware/authMiddleware";
 

const app = express();
const PORT = process.env.PORT || 8800;

app.use(cors());
app.use(bodyParser.json());

// Authentication routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// Shipment routes
app.post("/api/create-shipment", authenticateUser as any, createShipment);
app.get("/api/track-shipment", trackShipment);

// Dashboard routes
app.get("/api/user-shipments", authenticateUser as any, getUserShipments);

//Admin routes (uncomment if you have an admin user)
app.get(
  "/api/all-shipments",
  authenticateUser as any,
  authorizeAdmin as any,
  getAllShipments
);
app.put(
  "/api/update-shipment-status",
  authenticateUser as any,
  authorizeAdmin as any,
  updateShipmentStatus as any
);
app.put(
  "/api/user-update-shipment",
  authenticateUser as any,
  userUpdateShipment as any
);
app.put(
  "/api/admin-update-shipment",
  authenticateUser as any,
  authorizeAdmin as any,
  adminUpdateShipment as any
);
app.get(
  "/api/get-shipment-status",
  authenticateUser as any,
  getShipmentStatus as any
);
app.delete(
  "/api/admin-shipment-delete",
  authenticateUser as any,
  authorizeAdmin as any,
  adminShipmentDelete as any
);
app.delete(
  "/api/user-shipment-delete",
  authenticateUser as any,
  userShipmentDelete as any
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
