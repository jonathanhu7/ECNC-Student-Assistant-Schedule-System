/* 该 page.tsx 不渲染任何界面，直接重定向到 dashboard */
import { redirect } from "next/navigation";
import { paths } from "@/paths";

export default function Page(): never {
  redirect(paths.dashboard.overview);
}
