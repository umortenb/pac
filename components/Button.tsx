import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      className={
        "bg-green-400 px-7 py-2 rounded-md shadow text-gray-900 font-medium hover:bg-green-500 transition duration-150 ease-in-out disabled:opacity-60 disabled:pointer-events-none " +
        (loading ? "animate-spin" : "")
      }
      disabled={loading || props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
