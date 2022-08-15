import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      type={`${props.type || "submit"}`}
      className={`w-full rounded bg-[#e50914] py-3 font-semibold ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
