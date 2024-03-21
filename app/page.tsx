import React from "react";
import Image from "next/image";

export default function Page(): React.ReactNode {
  return (
    <div className="w-96">
      <Image
        src="/login-figure.jpg"
        alt="login figure"
        width={200}
        height={200}
      />
      <div>
        <p>ECNC 排班系统</p>
        <input type="text" />
        <input type="text" />
        <input type="checkbox"></input>
        <button>忘记密码</button>
        <button>登陆</button>
        <button>微信登陆</button>
        <button>飞书登陆</button>
        <p>没有账号？</p>
        <button>注册</button>
      </div>
    </div>
  );
}
