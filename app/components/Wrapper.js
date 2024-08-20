import React from "react";

export default function Wrapper({ children, className }) {
  return (
    <div
      className={`w-full md:max-w-[880px] 2xl:max-w-[1260px] px-5 md:px-10 mx-auto ${
        className || ""
      }`}
    >
        {children}
    </div>
  );
}
