import { useState } from "react";
import styles from "../styles/user-form.module.css";
import FancyInput from "./fancy-input";
import { AtSymIcon, Numbers123Icon, UserIcon } from "./icons";
import GenderSelector from "./gender-selector";
import useDigits from "../hooks/use-digits";

function UserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useDigits("");

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
        maxLength={50}
      />
      <FancyInput
        icon={<UserIcon />}
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
      />
      <FancyInput
        icon={<Numbers123Icon />}
        inputMode="numeric"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        maxLength={2}
      />
      <GenderSelector state={gender} setState={setGender} />
      <button>LISTO!</button>
    </div>
  );
}

export default UserForm;
