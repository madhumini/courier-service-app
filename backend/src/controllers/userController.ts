import { Request, Response } from "express";
import pool from "../db";

export const getUserShipments = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const userShipments = await pool.query(
      "SELECT * FROM shipments WHERE user_id = $1 ORDER BY id ASC",
      [userId]
    );

    res.json(userShipments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userShipmentDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    // Check if the shipment exists before deleting
    const getShipment = await pool.query(
      "SELECT * FROM shipments WHERE id = ($1)",
      [id]
    );

    if (getShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Delete the shipment and associated tracking
    await pool.query("DELETE FROM tracking WHERE shipment_id = ($1)", [id]);
    await pool.query("DELETE FROM shipments WHERE id = ($1)", [id]);

    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userUpdateShipment = async (req: any, res: Response) => {
  try {
    const {
      recipient_name,
      recipient_address,
      payment_method,
      shipment_contents,
      shipment_weight,
      shipment_dimensions,
      special_instructions,
      pickup_date,
      expected_delivery_date,
    } = req.body;
    const { id } = req.query;
    
    // Check if the shipment exists
    const existingShipment = await pool.query(
      "SELECT * FROM shipments WHERE id = ($1)",
      [id]
    );

    if (existingShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const updatedShipment = await pool.query(
      "UPDATE shipments SET recipient_name = $1, recipient_address = $2, payment_method = $3, shipment_contents = $4, shipment_weight = $5, shipment_dimensions = $6, special_instructions = $7, pickup_date = $8, expected_delivery_date = $9 WHERE id = $10 RETURNING *",
      [
        recipient_name,
        recipient_address,
        payment_method,
        shipment_contents,
        shipment_weight,
        shipment_dimensions,
        special_instructions,
        pickup_date,
        expected_delivery_date,
        id,
        
      ]
    );

    res.json(updatedShipment.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
