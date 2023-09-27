import { SLIDE_UP } from "../constants/animations";
import { FEMALE_GENDER, MALE_GENDER } from "../constants/constants";
import styles from "../styles/gender-selector.module.css";
import { GenderFemaleIcon, GenderMaleIcon } from "./icons";
import { motion } from "framer-motion";

function GenderSelector({ state, setState = () => {} }) {
  return (
    <div className={styles.container}>
      {state == MALE_GENDER ? (
        <motion.span
          key={MALE_GENDER}
          variants={SLIDE_UP}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SLIDE_UP.transition}
          className={styles.left}
        >
          Masculino
        </motion.span>
      ) : state == FEMALE_GENDER ? (
        <motion.span
          key={FEMALE_GENDER}
          variants={SLIDE_UP}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SLIDE_UP.transition}
          className={styles.right}
        >
          Femenino
        </motion.span>
      ) : (
        <motion.span
          key="none"
          variants={SLIDE_UP}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={SLIDE_UP.transition}
        >
          ¿Cuál es tu género?
        </motion.span>
      )}
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.gender} ${
            state === MALE_GENDER ? styles.selected : ""
          }`}
          onClick={() => setState(MALE_GENDER)}
        >
          <GenderMaleIcon width={48} height={48} />
        </button>
        <button
          className={`${styles.gender} ${
            state === FEMALE_GENDER ? styles.selected : ""
          }`}
          onClick={() => setState(FEMALE_GENDER)}
        >
          <GenderFemaleIcon width={48} height={48} />
        </button>
      </div>
    </div>
  );
}

export default GenderSelector;
