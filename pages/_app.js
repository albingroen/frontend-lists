import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import splitbee from "@splitbee/web";

// This initiliazes Splitbee.js
splitbee.init();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
