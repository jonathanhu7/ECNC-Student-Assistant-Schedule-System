import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request): Promise<NextResponse> {
  const apiUrl = process.env.API_URL;

  try {
    const requestData = await request.json();
    const { username, password } = requestData;
    // 先获取盐值
    const saltResponse = await fetch(apiUrl + `/auth/salt/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const saltData = await saltResponse.json();
    const salt = saltData.salt;
    // 对密码进行哈希操作
    const hashedPassword = await hash(password, salt);
    // 提交登录请求
    const response = await fetch(apiUrl + "/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: hashedPassword,
      }),
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "前端服务器处理表单时发生了错误",
    });
  }
}
