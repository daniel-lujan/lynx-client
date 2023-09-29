import { useState } from "react";
import styles from "../styles/user-form.module.css";
import FancyInput from "./fancy-input";
import { AtSymIcon, Numbers123Icon, UserIcon } from "./icons";
import GenderSelector from "./gender-selector";
import useDigits from "../hooks/use-digits";
import useFormData from "../hooks/use-form-data";
import RangeSlider from "./range-slider";

function UserForm() {
  const [step, setStep] = useState(0);

  return (
    <div className={`container ${styles.container}`}>
      {step === 0 && <BasicData onContinue={() => setStep(1)} />}
      {step === 1 && (
        <Tastes onContinue={() => setStep(2)} onReturn={() => setStep(0)} />
      )}
    </div>
  );
}

function BasicData({ onContinue }) {
  function handleContinue() {
    if (!isValidForm) return;
    setData({
      ...data,
      email,
      name,
      gender,
      age,
    });
    onContinue();
  }

  const { data, setData } = useFormData();

  const [email, setEmail] = useState(data.email ?? "");
  const [name, setName] = useState(data.name ?? "");
  const [gender, setGender] = useState(data.gender ?? "");
  const [age, setAge] = useDigits(data.age ?? "");

  const isValidForm = email && name.trim() && age;

  return (
    <>
      <h1 className="centered">
        Responde <b className="text-primary">sin mentir</b>
      </h1>
      <p className="text-opaque centered">
        Todo es obligatorio, excepto el género
      </p>
      <FancyInput
        icon={<AtSymIcon />}
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => {
          if (!/\s/.test(e.target.value)) {
            setEmail(e.target.value);
          }
        }}
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
      <button onClick={handleContinue} disabled={!isValidForm}>
        {isValidForm ? "CONTINUAR" : "Completa los campos"}
      </button>
    </>
  );
}

function Tastes({ onContinue, onReturn }) {
  const [moviesTaste, setMoviesTaste] = useState(0);
  console.log(moviesTaste);
  return (
    <>
      <h1 className="centered">
        Qué tanto <b className="text-primary">te gusta...</b>
      </h1>
      <RangeSlider value={moviesTaste} onChange={setMoviesTaste} />
    </>
  );
}

export default UserForm;
