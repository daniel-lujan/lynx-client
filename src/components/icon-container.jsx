import styles from "../styles/icon-container.module.css";
import { motion } from "framer-motion";

export default function IconContainer({ children, animation, ...props }) {
  return (
    <motion.div className={styles.container} {...props} {...animation}>
      {children}
    </motion.div>
  );
}
