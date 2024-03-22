import React from "react";
import FreeTimeSubmitForm from "@/app/components/free-time-submit-form";
import Image from "next/image";
export default function HomePage(): React.ReactElement {
  return (
    <div className="bg-white h-full rounded-xl flex justify-center flex items-center space-x-28">
      <FreeTimeSubmitForm />
      <Image
        src="/work-figure.jpg"
        alt="work figure"
        width={400}
        height={400}
      />
    </div>
  );
}
