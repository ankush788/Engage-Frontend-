import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeButton/DarkModeButton";
export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <DarkModeToggle />
    </>
  );
}
