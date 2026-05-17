// lib/auth/verifyAdmin.ts

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyToken = (req: NextRequest) => {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    isAdmin: boolean;
  };

 

  return decoded;
};