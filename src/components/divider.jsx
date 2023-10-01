import styles from "../styles/divider.module.css";

export default function Divider() {
  return (
    <span className={styles.container}>
      <hr className={styles.line} />
    </span>
  );
}
