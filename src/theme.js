// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },

  colors: {
    brand: {
      900: "#F30",
      800: "#f40",
      700: "#f50",
      600: "#f60",
    },
    gray: {
      100: "#f5f5f5",
      200: "#e2e2e2",
      300: "#c6c6c6",
      400: "#a0a0a0",
      500: "#7b7b7b",
      600: "#555",
      700: "#333",
      800: "#1f1f1f",
      900: "#121212", // deep dark
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
        fontFamily: "monospace",
        fontSize: { base: "14px", md: "16px", lg: "18px" },
      },
    },
  },
  components: {
  Button: {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "md",
    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
  },
  variants: {
    solid: {
      bg: "brand.900",
      color: "gray.100",
      transition: "all 0.2s ease-in-out",
      border: "none",
      outline: "none",
      _focus: {
        boxShadow: "none",
        border: "none",
        outline: "none",
      },
      _hover: {
        boxShadow: "0 6px 20px rgba(252, 189, 1, 0.33)",
        transform: "scale(1.02)",
        transition: "0.2s ease-in-out",
        bg: "brand.900",
      },
      _active: {
        boxShadow: "0 0px 2px rgba(252, 189, 1, 0.26)",
        transform: "scale(1.02)",
        transition: "0.2s ease-in-out",
        bg: "brand.900",
      },
      _focusVisible: {
        boxShadow: "none",
        border: "none",
        outline: "none",
      },
    },
    outline: {
      border: "1px solid",
      borderColor: "brand.900",
      color: "brand.800",
      bg: "transparent",
      _hover: {
        bg: "transparent",
        color: "brand.primary",
        borderColor: "brand.600",
        boxShadow: "0 0 12px #f60",
      },
      _active: {
        transform: "scale(0.98)",
      },
      _focus: {
        boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
      },
    },
    ghost: {
      color: "gray.100",
      bg: "transparent",
      boxShadow: "0 2px 8px rgba(255, 136, 0, 0.4)",
      transition: "all 0.2s ease-in-out",
      _hover: {
        color: "#f80",
        bg: "transparent",
        boxShadow:
          "5px 5px 40px #f80, -5px -5px 40px #f80, inset 5px 5px 10px #d8a1090f, inset -5px -5px 10px #aba58601",
      },
    },
    link: {
      color: "brand.700",
      textDecoration: "underline",
      textUnderlineOffset: "2px",
      textDecorationThickness: "2px",
      textDecorationColor: "brand.700",
      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
      transition: "all 0.2s ease-in-out",
      fontSize: "16px",
      fontFamily: "Inter, sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
      lineHeight: "24px",
      letterSpacing: "0.1px",
      outline: "none",
      border: "none",
      boxShadow: "none",
      _focus: { boxShadow: "none", border: "none", outline: "none" },
      _focusVisible: { boxShadow: "none", border: "none", outline: "none" },
      _hover: { textDecoration: "none", color: "brand.700" },
      _active: {
        transform: "scale(0.98)",
        boxShadow:
          "5px 5px 40px #f80, -5px -5px 40px #f80, inset 5px 5px 10px #d8a1090f, inset -5px -5px 10px #aba58601",
        border: "none",
        outline: "none",
      },
    },
  },
},

//input 
   Input: {
  variants: {
    outline: {
      field: {
        borderColor: "brand.500",
        _focus: {
          outline: "none",
          borderColor: "brand.600",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-600) !important",
        },
        _focusVisible: {
          outline: "none",
          borderColor: "brand.600",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-600) !important",
        },
        _active: {
          outline: "none",
          borderColor: "brand.600",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-600) !important",
        },
        _hover: {
          outline: "none",
          borderColor: "brand.600",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-600) !important",
        },
      },
    },
  },
},


    // Select
   Select: {
      variants: {
        outline: {
          field: {
            borderColor: "brand.500",
            _hover: { borderColor: "brand.600" },
            _focus: {
              outline: "none",
              borderColor: "brand.600",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-600) !important",
            },
          },
        },
      },
    },
  },
});

export default theme;
