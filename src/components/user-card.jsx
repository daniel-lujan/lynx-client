import { FEMALE_GENDER, MALE_GENDER } from "../constants/constants";
import styles from "../styles/user-card.module.css";
import { GenderFemaleIcon, GenderMaleIcon } from "./icons";
import { ManIllustration, WomanIllustration } from "./illustrations";

export default function UserCard({ gender, name, age, perfectMatch }) {
  return (
    <div className={styles.container}>
      {gender === FEMALE_GENDER ? (
        <WomanIllustration width="78" />
      ) : (
        <ManIllustration width="78" />
      )}
      <div className={styles.info}>
        <h2 className={styles.name}>
          {name}
          {gender === MALE_GENDER ? (
            <GenderMaleIcon style={{ color: "#00bdff" }} />
          ) : gender === FEMALE_GENDER ? (
            <GenderFemaleIcon style={{ color: "#ff8dd5" }} />
          ) : null}
        </h2>
        <p>{age} años</p>
      </div>
      {perfectMatch && <figure className={styles.perfect}>🔥</figure>}
    </div>
  );
}
