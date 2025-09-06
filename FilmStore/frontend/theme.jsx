// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
  colors: {
    brand: {
      50: "#fef6ff",
      100: "#fedfff",
      200: "#fcbeff",
      300: "#fa95ff",
      400: "#f668ff",
      500: "#e63fff",
      600: "#b72acc",
      700: "#7d1980",
      800: "#4b0d50",
      900: "#200020",
    },
  },
});

export default theme;
