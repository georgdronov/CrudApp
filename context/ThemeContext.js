import { createContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorsScheme] = useState(Appearance.getColorScheme());

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ theme, setColorsScheme }}>
      {children}
    </ThemeContext.Provider>
  )
};
