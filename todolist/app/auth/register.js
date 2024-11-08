"use client";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../backend/models/User";

export async function POST(req) {
  const { username, password } = await req.json();

  const userExists = await User.findOne({ username });
  if (userExists) {
    return NextResponse.json(
      { message: "El usuario ya existe" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "Usuario registrado exitosamente" });
}
