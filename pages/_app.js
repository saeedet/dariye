import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { store } from "../redux/app/store";
import { Provider as ReduxProvider } from "react-redux";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
