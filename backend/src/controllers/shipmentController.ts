import { Request, Response } from "express";
import pool from "../db";

export const createShipment = async (req: any, res: Response) => {
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
    const sender_name = req.user.name;
    const sender_address = req.user.address;
    const userId = req.user.id;

    const newShipment = await pool.query(
      "INSERT INTO shipments (sender_name,sender_address,recipient_name,recipient_address,payment_method,shipment_contents,shipment_weight,shipment_dimensions,special_instructions,pickup_date,expected_delivery_date, user_id) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [
        sender_name,
        sender_address,
        recipient_name,
        recipient_address,
        payment_method,
        shipment_contents,
        shipment_weight,
        shipment_dimensions,
        special_instructions,
        pickup_date,
        expected_delivery_date,
        userId,
      ]
    );
    const shipment_id = newShipment.rows[0].id;

    if (shipment_id) {
      const newTracking = await pool.query(
        "INSERT INTO tracking (shipment_id) VALUES ($1) RETURNING *",
        [shipment_id]
      );
    }

    res.json(newShipment.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const trackShipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const status = await pool.query(
      "SELECT status FROM tracking WHERE shipment_id = ($1)",
      [id]
    );

    if (status.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(status.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
