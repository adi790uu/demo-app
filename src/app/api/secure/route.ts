import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = req.headers.get("user");
  return NextResponse.json({
    message: "This is a secure endpoint",
    user: JSON.parse(user!),
  });
}
