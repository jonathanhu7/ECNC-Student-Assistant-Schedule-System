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

// 定义表单的数据类型
const schema = zod.object({
  username: zod.string().min(1, { message: "请输入你的用户名" }),
  password: zod.string().min(1, { message: "请输入你的密码" }),
});

// 将上述表单的数据类型转换为 typescript 的类型
type Values = zod.infer<typeof schema>;
// 用于测试的默认数据
// TODO: 删除 defaultValues
const defaultValues = {
  username: "ecncadmin",
  password: "1qaz2wsx.",
} satisfies Values;

export function SignInForm(): React.ReactElement {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false); // 设置是否显示密码
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const submitInfo = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        // 发送登录请求
        const response = await fetch("/api/auth/sign-in", {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorData = (await response.json()) as { message?: string };
          setError("root", {
            type: "server",
            message: errorData.message ?? "服务器发生错误",
          });
        }
      } catch (error) {
        setError("root", {
          type: "client",
          message: "客户端发生错误",
        });
      } finally {
        setIsPending(false);
      }
    },
    [router, setError],
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h4">登录</Typography>
      <form onSubmit={handleSubmit(submitInfo)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>用户名</InputLabel>
                <OutlinedInput {...field} label="用户名" type="text" />
                {errors.username !== undefined ? (
                  <FormHelperText>{errors.username.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
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
                {errors.password !== undefined ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root !== undefined ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            登录
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
