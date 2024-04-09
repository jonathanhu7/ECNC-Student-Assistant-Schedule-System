/* 该 page.tsx 不渲染任何界面，直接重定向 */
import { redirect } from "next/navigation";

export default function Page(): never {
  redirect("/auth/sign-in");
}
