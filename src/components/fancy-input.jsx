import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "../styles/fancy-input.module.css";
import { FADE } from "../constants/animations";
import IconContainer from "./icon-container";

function FancyInput({ icon, ...props }) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`${styles.fancyInput} ${focus ? styles.focused : ""}`}>
      <AnimatePresence>
        {focus && icon && (
          <IconContainer
            animation={{
              variants: FADE,
              initial: "initial",
              animate: "animate",
              exit: "exit",
              transition: FADE.transition,
            }}
          >
            {icon}
          </IconContainer>
        )}
      </AnimatePresence>
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

export default FancyInput;
