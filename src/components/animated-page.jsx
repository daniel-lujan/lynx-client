import { CONTAINER } from "../constants/animations";
import styles from "../styles/animated-page.module.css";
import { motion } from "framer-motion";

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      className={`container ${styles.container}`}
      key="sending-page"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
