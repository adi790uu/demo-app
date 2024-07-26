import { randomInt, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { encode_jwt } from "secureauthjwt"; // Make sure this path is correct

export async function POST(req: NextRequest) {
  const { name, secret, ttl, aud, msg } = await req.json();
  const payload = { name, msg };

  const id = randomInt(1000000000, 9999999999).toString();
  const timeToLive: number = ttl ? Number(ttl) : 3600;
  const iss = "secureauthjwt-web";

  const token = await encode_jwt(secret, id, payload, timeToLive, aud, iss);
  return NextResponse.json({ token });
}
