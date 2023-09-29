import { useState } from "react";

export default function useDigits(defaultValue) {
  function handleChange(value) {
    setDigits(value.replace(/\D/g, "")); // Remove all non-digits
  }

  const [digits, setDigits] = useState(defaultValue);
  return [digits, handleChange];
}
