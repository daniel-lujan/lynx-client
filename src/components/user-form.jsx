import { useState } from "react";
import styles from "../styles/user-form.module.css";
import FancyInput from "./fancy-input";
import { AtSymIcon, Numbers123Icon, UserIcon } from "./icons";
import GenderSelector from "./gender-selector";
import useDigits from "../hooks/use-digits";
import useFormData from "../hooks/use-form-data";
import RangeSlider from "./range-slider";
import FormRecovery from "./form-recovery";

function UserForm() {
  const [step, setStep] = useState(0);

  return (
    <FormRecovery>
      <div className={`container ${styles.container}`}>
        {step === 0 && <BasicData onContinue={() => setStep(1)} />}
        {step === 1 && (
          <Tastes onContinue={() => setStep(2)} onReturn={() => setStep(0)} />
        )}
      </div>
    </FormRecovery>
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
  function handleNavigation(callback) {
    setData({
      ...data,
      moviesTaste,
      concertsTaste,
      partiesTaste,
    });
    callback();
  }

  const { data, setData } = useFormData();

  const [moviesTaste, setMoviesTaste] = useState(data.moviesTaste ?? 0);
  const [concertsTaste, setConcertsTaste] = useState(data.concertsTaste ?? 0);
  const [partiesTaste, setPartiesTaste] = useState(data.partiesTaste ?? 0);

  return (
    <>
      <h1 className="centered">
        Qué tanto <b className="text-primary">te gusta...</b>
      </h1>
      <h2 className="centered">El cine... 🚬</h2>
      <RangeSlider value={moviesTaste} onChange={setMoviesTaste} />
      <h2 className="centered">La fiesta... 🎉</h2>
      <RangeSlider value={partiesTaste} onChange={setPartiesTaste} />
      <h2 className="centered">Los conciertos... 🎤</h2>
      <RangeSlider value={concertsTaste} onChange={setConcertsTaste} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "20px",
        }}
      >
        <button
          style={{ width: "100%" }}
          onClick={() => handleNavigation(onReturn)}
        >
          VOLVER
        </button>
        <button
          style={{ width: "100%" }}
          onClick={() => handleNavigation(onContinue)}
        >
          CONTINUAR
        </button>
      </div>
    </>
  );
}

export default UserForm;
