import React from "react";
import Image from "next/image";
export default function ECNCLogo(): React.ReactElement {
  return (
    <div className="flex items-center justify-center leading-none pt-5 pb-5">
      <Image
        src="/sideBarIcon.png"
        alt="side bar icon"
        width={18}
        height={18}
      />
      <p className="text-logo-text-color font-bold text-lg ml-3">ECNC SYSTEM</p>
    </div>
  );
}
