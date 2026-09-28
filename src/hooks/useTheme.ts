import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("signal-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("signal-theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggleTheme: () => setDark((value) => !value) };
}
