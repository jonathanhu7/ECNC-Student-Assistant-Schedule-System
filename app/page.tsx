/* 该 page.tsx 不渲染任何界面，只负责根据用户的登陆状态来重定向 */
import { redirect } from "next/navigation";

export default function Page(): void {
  // TODO：将下面的 userIsLoggedIn = false 替换为 cookie 登陆检查逻辑
  const userIsLoggedIn = false;

  // 判断用户是否登陆，若未登陆则跳转到 /authentication/login 页面，否则跳转到 /main/dashboard 页面
  if (!userIsLoggedIn) {
    redirect("/authentication/login");
  } else {
    redirect("/main/dashboard");
  }
}
