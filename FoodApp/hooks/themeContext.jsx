import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const lightTheme = {
  header: "#fff",
  background: "#fff",
  buttonBackground: "white",
  color: "blue",
  border: "lightgrey",
  colorText: "black"
};

const darkTheme = {
  header: "#222",
  background: "#2c3233",
  buttonBackground: "#3c4446",
  color: "white",
  border: "lightgrey",
  colorText: "white"
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const toggleHandle = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value !== null) {
        setDarkMode(JSON.parse(value));
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode, loading]);

  if (loading) return null;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleHandle, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
