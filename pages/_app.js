import "@/public/assets/css/bootstrap.css";
import "@/public/assets/css/style.css";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}
