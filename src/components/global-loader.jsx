import styles from "../styles/loader.module.css";

export default function GlobalLoader() {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}
