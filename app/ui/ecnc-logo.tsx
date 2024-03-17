import { roboto } from "@/app/ui/fonts";
import React from "react";
export default function ECNCLogo(): React.ReactElement {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none justify-center pt-8 pb-8`}
    >
      <p className="text-logo-color-main font-bold text-logo-size mr-1">ECNC</p>
      <p className="text-logo-color-auxiliary text-logo-size">SYSTEM</p>
    </div>
  );
}
