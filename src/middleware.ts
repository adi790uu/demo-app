import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode_jwt } from "secureauthjwt";

export async function middleware(req: NextRequest) {
  console.log(req.headers.get("authorization"));
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  const secret = "123";

  try {
    const decoded = await decode_jwt(secret, token);
    console.log(decoded);
    req.headers.set("user", JSON.stringify(decoded));
  } catch (error) {
    console.log("here");
    console.log(error);
    return new NextResponse("unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/secure/",
};
