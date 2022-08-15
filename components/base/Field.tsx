interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Field = ({ children, ...props }: Props) => {
  return (
    <label
      className={`inline-block w-full ${props.className || ""}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Field;
