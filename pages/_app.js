import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { store } from "../redux/app/store";
import { Provider as ReduxProvider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
