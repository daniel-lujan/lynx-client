import { useState } from "react";

export default function useDigits() {
  function handleChange(value) {
    setDigits(value.replace(/\D/g, "")); // Remove all non-digits
  }

  const [digits, setDigits] = useState("");
  return [digits, handleChange];
}
