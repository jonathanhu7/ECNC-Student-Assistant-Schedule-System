import { paths } from "@/paths";
import { NextResponse } from "next/server";
import { hash, genSalt } from "bcrypt";

export async function POST(request: Request): Promise<NextResponse> {
  const api_url = process.env.API_URL;
  // 定义盐的复杂度
  const saltRounds = 10;

  try {
    const requestData = await request.json();
    const { username, password } = requestData;
    // 对密码进行哈希操作
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    // 提交登录请求
    const response = await fetch(api_url + paths.api.auth.signIn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
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
