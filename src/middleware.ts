import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode_jwt, validate_jwt } from "secureauthjwt";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  console.log(secret);

  if (!secret) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  try {
    const isValid = await validate_jwt(secret, token);

    if (!isValid) {
      return new NextResponse("token expired", { status: 401 });
    }
    const decoded = await decode_jwt(secret, token);
    const res = NextResponse.next();

    console.log(decoded);

    res.headers.set("user", JSON.stringify(decoded));

    if (url.pathname === "/api/admin" && decoded.payload.role !== "admin") {
      throw new Error("Not an admin!");
    }

    return res;
  } catch (error) {
    console.log(error);
    return new NextResponse("unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: ["/api/secure/", "/api/admin/"],
};
