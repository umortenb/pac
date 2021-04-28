import { AppProps } from "next/dist/next-server/lib/router/router";
import AuthProvider from "../components/AuthProvider";
import "../styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
