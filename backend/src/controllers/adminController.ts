import { Request, Response } from "express";
import pool from "../db";

export const getAllShipments = async (req: any, res: Response) => {
  try {
    const allShipments = await pool.query(
      "SELECT * FROM shipments ORDER BY id ASC"
    );

    res.json(allShipments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateShipmentStatus = async (req: any, res: Response) => {
  try {
 
    const { shipmentStatusId, status } = req.body;

    const updatedShipment = await pool.query(
      "UPDATE tracking SET status = $1 WHERE shipment_id = $2 RETURNING *",
      [status, shipmentStatusId]
    );

    if (updatedShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(updatedShipment.rows[0].status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getShipmentStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.query;

    const getShipment = await pool.query(
      "SELECT status FROM tracking WHERE shipment_id = ($1)",
      [id]
    );

    if (getShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(getShipment.rows[0].status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminShipmentDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const getShipment = await pool.query(
      "SELECT * FROM shipments WHERE id = $1",
      [id]
    );

    if (getShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    await pool.query("DELETE FROM tracking WHERE shipment_id = ($1)", [id]);
    await pool.query("DELETE FROM shipments WHERE id = ($1)", [id]);

    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminUpdateShipment = async (req: any, res: Response) => {
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
      shipping_cost,
      carrier_name,
    } = req.body;

    const { id } = req.query;

    const existingShipment = await pool.query(
      "SELECT * FROM shipments WHERE id = ($1)",
      [id]
    );

    if (existingShipment.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    const updatedShipment = await pool.query(
      "UPDATE shipments SET recipient_name = $1, recipient_address = $2, payment_method = $3, shipment_contents = $4, shipment_weight = $5, shipment_dimensions = $6, special_instructions = $7, pickup_date = $8, expected_delivery_date = $9 ,shipping_cost = $10,carrier_name = $11 WHERE id = $12 RETURNING *",
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
        shipping_cost,
        carrier_name,
        id,
      ]
    );

    res.json(updatedShipment.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
