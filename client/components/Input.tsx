import React from "react";

type Props = {
  placeholder?: string;
  type?: string;
};

const Input = ({ placeholder = "", type = "text" }: Props) => {
  return (
    <input
      placeholder={placeholder}
      className="mt-[30px] text-[20px] text-center text-white font-bold w-4/5 px-[6px] py-[9px] border-b-[7px] border-[#717171] focus:border-[#e7a007] duration-150 outline-none bg-transparent"
      type={type}
    />
  );
};

export default Input;
