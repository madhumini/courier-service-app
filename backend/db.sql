CREATE DATABASE courierdb;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin Boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS shipments (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(255) NOT NULL,
  sender_address VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_address VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  shipment_contents VARCHAR(255) NOT NULL,
  shipment_weight VARCHAR(255) NOT NULL,
  shipment_dimensions VARCHAR(255) NOT NULL,
  special_instructions VARCHAR(255) NOT NULL,
  pickup_date TIMESTAMP NOT NULL,
  expected_delivery_date TIMESTAMP NOT NULL,
  shipping_cost NUMERIC(10, 2),
  carrier_name VARCHAR(255),
  user_id INT REFERENCES users(id)
  
);

CREATE TABLE IF NOT EXISTS tracking (
  id SERIAL PRIMARY KEY,
  shipment_id INT REFERENCES shipments(id),
  status VARCHAR(50) DEFAULT 'Pending',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
