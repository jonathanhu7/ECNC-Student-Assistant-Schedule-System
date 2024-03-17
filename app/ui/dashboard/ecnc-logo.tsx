import { roboto } from "@/app/ui/fonts";
import React from "react";
export default function ECNCLogo(): React.ReactElement {
  return (
    <div
      className={`${roboto.className} 
      flex flex-row 
      items-center justify-center 
      leading-none 
      pt-5 pb-5`}
    >
      <p
        className="text-logo-color-main
        font-bold
        text-logo-size
        mr-1"
      >
        ECNC
      </p>
      <p
        className="text-logo-color-auxiliary
        text-logo-size"
      >
        SYSTEM
      </p>
    </div>
  );
}
