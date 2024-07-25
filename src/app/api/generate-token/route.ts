import { NextRequest, NextResponse } from "next/server";
import { encode_jwt } from "secureauthjwt"; // Make sure this path is correct

export async function POST(req: NextRequest) {
  const { name, admin, secret } = await req.json();
  console.log(secret);
  const payload = { name, admin, secret };

  const id = "1234567890";
  const ttl = 3600;

  const token = await encode_jwt(secret, id, payload, ttl);
  return NextResponse.json({ token });
}
