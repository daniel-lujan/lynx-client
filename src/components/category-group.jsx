import { cloneElement } from "react";
import styles from "../styles/category-group.module.css";

export default function CategoryGroup({
  children,
  state,
  setState,
  type = "list",
}) {
  function handleChange(value) {
    if (type === "list") {
      if (state.includes(value)) {
        setState(state.filter((item) => item !== value));
      } else {
        setState([...state, value]);
      }
    } else {
      setState(value);
    }
  }

  return (
    <div className={styles.container}>
      {Array.isArray(children)
        ? children.map((child) =>
            cloneElement(child, { state, onClick: handleChange, type })
          )
        : cloneElement(children, { state, handleChange, type })}
    </div>
  );
}

export function CategoryOption({ state, value, text, onClick, type }) {
  const isSelected = type === "list" ? state.includes(value) : state === value;

  return (
    <button
      className={`${styles.option} ${
        isSelected ? styles.selected : styles.unselected
      }`}
      onClick={() => onClick(value)}
    >
      {text}
    </button>
  );
}
