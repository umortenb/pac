import { FormEvent, useState } from "react";
import { firebaseAuth } from "../lib/firebase";
import FormInput from "./FormInput";

export interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    firebaseAuth.signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-items-center p-4 bg-red-50 min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="font-semibold text-xl text-gray-800">Mail</label>
        <FormInput
          type="mail"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label className="font-semibold text-xl text-gray-800 mt-2">
          Password
        </label>
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input className="mt-2" type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default LoginForm;
