"use client";

import React, { useState } from "react";
import {
  Alert,
  Button,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { z as zod } from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import {
  Eye as EyeIcon,
  EyeSlash as EyeSlashIcon,
} from "@phosphor-icons/react";
import { paths } from "@/paths";

// 定义表单的数据类型
const schema = zod.object({
  username: zod.string().min(1, { message: "请输入你的用户名" }),
  password: zod.string().min(1, { message: "请输入你的密码" }),
});

// 将上述表单的数据类型转换为 typescript 的类型
type Values = zod.infer<typeof schema>;

export function SignInForm(): React.ReactElement {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false); // 设置是否显示密码
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<Values>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values): Promise<void> => {
    try {
      const response = await fetch(paths.api.auth.signIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        form.setError("root", {
          type: "server",
          message: responseData.message,
        });
      }
    } catch (errors) {
      form.setError("root", {
        type: "client",
        message: "客户端处理表单数据时发生错误",
      });
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h4">登录</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(form.formState.errors.username)}>
                <InputLabel>用户名</InputLabel>
                <OutlinedInput {...field} label="用户名" type="text" />
                {form.formState.errors.username !== undefined ? (
                  <FormHelperText>
                    {form.formState.errors.username.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(form.formState.errors.password)}>
                <InputLabel>密码</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize)"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize)"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="密码"
                  type={showPassword ? "text" : "password"}
                />
                {form.formState.errors.password !== undefined ? (
                  <FormHelperText>
                    {form.formState.errors.password.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {form.formState.errors.root !== undefined ? (
            <Alert color="error">{form.formState.errors.root.message}</Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            登录
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
