import { useState } from "react";
import styles from "../styles/user-form.module.css";
import FancyInput from "./fancy-input";
import { AtSymIcon, UserIcon } from "./icons";
import GenderSelector from "./gender-selector";

function UserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="centered">
        Responde{" "}
        <b
          style={{
            color: "var(--primary-color)",
          }}
        >
          sin mentir
        </b>
      </h1>
      <p className="text-opaque centered">
        Todo es obligatorio, excepto el género
      </p>
      <FancyInput
        icon={<AtSymIcon />}
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={20}
      />
      <FancyInput
        icon={<UserIcon />}
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={20}
      />
      <GenderSelector state={gender} setState={setGender} />
      <button>LISTO!</button>
    </div>
  );
}

export default UserForm;
