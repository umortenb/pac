import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../lib/firebase";
import firebase from "firebase/app";

const AuthContext = createContext<{
  user: firebase.User | null;
  loading: boolean;
}>({ user: null, loading: true });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState(firebaseAuth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, loading: loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
