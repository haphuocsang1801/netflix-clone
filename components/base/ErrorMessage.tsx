import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
}

const ErrorMessage = ({ error }: Props) => {
  return (
    <>
      {error && (
        <p className="p-1 text-[13px] font-light  text-orange-500">
          {error.message}
        </p>
      )}
    </>
  );
};

export default ErrorMessage;
