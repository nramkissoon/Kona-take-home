import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "../../styles/globals.css";

const theme = extendTheme({
  colors: {
    kona: {
      beige: "#fdf3da",
      green: "#73ba75",
      "dark-green": "#24a23f",
      red: "#aa2134",
      yellow: "#ffcc4d",
      "dark-gray": "#5b5a5a",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
