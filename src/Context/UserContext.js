// UserProvider.js
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [DarkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("DarkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("DarkMode", JSON.stringify(DarkMode));
  }, [DarkMode]);

  return (
    <UserContext.Provider value={{ DarkMode, setDarkMode }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
