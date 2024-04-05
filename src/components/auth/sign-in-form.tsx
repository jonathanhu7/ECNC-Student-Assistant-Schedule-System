"use client";

import React, { useState } from "react";
import {
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { z as zod } from "zod"; // zod 可以帮助我们检查表单数据
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { FormControl } from "@mui/base";

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
  const router = useRouter();
  const { checkSession } = useUser(); // 从 userContext 中解构出 checkSession 方法
  const [showPassword, setShowPassword] = useState<boolean>(false); // 设置是否显示密码
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const { error } = await authClient.signInWithPassword(values);

      if (error !== undefined) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      // 更新用户上下文
      await checkSession?.();

      // 登陆成功后刷新页面
      router.refresh();
    },
    [checkSession, router, setError],
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h4">登录</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="netid"
            render={({ field }) => (
              <FormControl error={Boolean(errors.netid)}>
                <InputLabel>NetID</InputLabel>
                <OutlinedInput {...field} label="NetID" />
                {errors.netid !== undefined ? (
                  <FormHelperText>{errors.netid.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Stack>
      </form>
    </Stack>
  );
}
