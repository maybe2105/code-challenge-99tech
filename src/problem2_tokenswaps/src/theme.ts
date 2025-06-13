import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        solid: {
          bg: "blue.500",
          color: "white",
          _hover: {
            bg: "blue.600",
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: "blue.500",
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: "blue.500",
      },
    },
  },
});

export default theme;
