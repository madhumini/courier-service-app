import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../db";

interface AuthRequest extends Request {
  user?: { id: number; name: string; address: string };
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    const decodedToken = jwt.verify(
      token.replace("Bearer ", ""),
      "your_secret_key"
    ) as any;

    const userId = decodedToken.userId;

    const userQueryResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    const user = {
      id: userQueryResult.rows[0].id,
      name: userQueryResult.rows[0].name,
      address: userQueryResult.rows[0].address,
    };

    if (userQueryResult.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized - Invalid user" });
    }

    req.user = user;

    next();

  } catch (error) {
    
    console.error(error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export const authorizeAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const userId = req.user?.id;
  const userQueryResult = await pool.query(
    "SELECT * FROM users WHERE id = ($1)",
    [userId]
  );

  if (userQueryResult?.rows?.length === 0 || !userQueryResult?.rows[0]?.isAdmin) {
    return res.status(403).json({ message: "Forbidden - Not an admin" });
  }

  next();
};
