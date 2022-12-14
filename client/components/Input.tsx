import React from "react";

type Props = {
  placeholder?: string;
  type?: string;
  className?: string;
  required?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = ({
  placeholder = "",
  type = "text",
  className = "",
  required = false,
  onChange,
}: Props) => {
  return (
    <input
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      type={type}
      className={`
        mt-[30px] px-[6px] py-[9px] 
        text-white font-bold text-[20px] 
        border-b-[7px] border-[#717171] 
        focus:border-[#e7a007] duration-150 
        outline-none bg-transparent
        ${className}
      `}
    />
  );
};

export default Input;
