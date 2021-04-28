import { HTMLProps } from "react";

const FormInput: React.FC<HTMLProps<HTMLInputElement>> = (props) => {
  return <input className="bg-gray-50 p-2 rounded-md" {...props} />;
};

export default FormInput;
