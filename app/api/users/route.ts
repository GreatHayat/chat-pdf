import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  console.log("BODY", body);
  return NextResponse.json({ message: "OK" });
}
