import React, { ChangeEventHandler } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  rows?: number;
  required?: boolean;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
};

const Textarea = ({
  placeholder = "",
  rows = 4,
  className = "",
  required = false,
  onChange,
}: Props) => {
  return (
    <textarea
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className={`
        mt-[30px] px-[6px] py-[9px] 
        text-[20px] text-white font-bold  
        border-b-[7px] border-[#717171] 
        focus:border-[#e7a007] duration-150 
        outline-none bg-transparent
        ${className}
      `}
    />
  );
};

export default Textarea;
