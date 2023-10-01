import styles from "../styles/selectable-image.module.css";
import { CheckIcon } from "./icons";

export default function SelectableImage({ selected, onClick, ...props }) {
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img {...props} />
      {selected && (
        <>
          <div className={styles.corner} />
          <CheckIcon className={styles.check} />
        </>
      )}
    </div>
  );
}

export function ImagesContainer({ children }) {
  return <div className={styles.imagesContainer}>{children}</div>;
}
