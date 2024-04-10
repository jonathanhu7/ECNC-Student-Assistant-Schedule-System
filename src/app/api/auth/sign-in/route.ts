import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const { username, password } = await request.json();

    const response = await fetch(apiUrl + "/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({
        message: errorData.message,
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "登录成功",
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json({ message: "客户端错误" });
  }
}
