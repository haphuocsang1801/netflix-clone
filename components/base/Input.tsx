import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

const Input = ({
  children,
  ...props
}: UseControllerProps<any> & React.InputHTMLAttributes<HTMLInputElement>) => {
  const { field } = useController({
    control: props.control,
    name: props.name,
    defaultValue: "",
  });
  return <input {...props} {...field} />;
};

export default Input;
