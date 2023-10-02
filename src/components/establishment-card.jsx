import styles from "../styles/establishment-card.module.css";
import { StarFilledIcon, StarIcon } from "./icons";

export default function EstablishmentCard({ name, address, rating }) {
  const filledStars = Math.floor(rating);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i >= filledStars) stars.push(<StarIcon key={i} />);
    else {
      stars.push(<StarFilledIcon key={i} />);
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.icon}>💞</p>
      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <p className="text-opaque">{address}</p>
        <div className={styles.rating}>
          {stars}
          {rating}
        </div>
      </div>
    </div>
  );
}
