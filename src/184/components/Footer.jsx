import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {

  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <footer style={{ backgroundColor: isDark ? "black" : "lightgray" }}>
      <button onClick={() => setIsDark(!isDark)}>DarkMode</button>
    </footer>
  );
};

export default Footer;