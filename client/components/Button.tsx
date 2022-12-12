import React from "react";

type Props = {
  children: any;
};

const Button = ({ children }: Props) => {
  return (
    <button className="text-[#0b0b0b] text-[14px] mt-[25px] font-bold rounded-full tracking-[2px] bg-[#717171] py-[25px] px-[27px] duration-200 hover:bg-[#e7a007] hover:text-white">
      {children}
    </button>
  );
};

export default Button;
