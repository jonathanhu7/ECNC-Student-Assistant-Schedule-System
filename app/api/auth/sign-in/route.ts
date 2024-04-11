import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(apiUrl + "/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return NextResponse.json({
    response,
  });
}
