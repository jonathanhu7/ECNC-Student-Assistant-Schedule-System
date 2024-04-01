import React from "react";
import { Stack } from "@mui/material";
import { z as zod } from "zod"; // zod 可以帮助我们检查表单数据

// 定义表单的数据类型
const schema = zod.object({
  netid: zod.string().min(1, { message: "请输入你的 netid" }),
  password: zod.string().min(1, { message: "请输入你的密码" }),
});

// 将上述表单的数据类型转换为 typescript 的类型
type Values = zod.infer<typeof schema>;

// 用于测试的默认数据
// TODO: 换成 postman 的 mock 数据
const defaultValues = {
  netid: "ecncadmin",
  password: "1qaz2wsx.",
} satisfies Values;

// TODO: 完成登录表单
export function SignInForm(): React.ReactElement {
  return <Stack></Stack>;
}
