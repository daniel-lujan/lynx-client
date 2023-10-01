import { useState } from "react";
import styles from "../styles/user-form.module.css";
import FancyInput from "./fancy-input";
import { AtSymIcon, Numbers123Icon, UserIcon } from "./icons";
import GenderSelector from "./gender-selector";
import useDigits from "../hooks/use-digits";
import useFormData from "../hooks/use-form-data";
import RangeSlider from "./range-slider";
import FormRecovery from "./form-recovery";
import CategoryGroup, { CategoryOption } from "./category-group";
import { MUSIC_GENRES, PERSON_CHARACTERISTICS } from "../constants/constants";
import SelectableImage, { ImagesContainer } from "./selectable-image";
import Divider from "./divider";

function UserForm() {
  const [step, setStep] = useState(0);

  return (
    <FormRecovery>
      {step === 0 && <BasicData onContinue={() => setStep(1)} />}
      {step === 1 && (
        <Tastes onContinue={() => setStep(2)} onReturn={() => setStep(0)} />
      )}
      {step === 2 && (
        <Categories onContinue={() => setStep(3)} onReturn={() => setStep(1)} />
      )}
      {step === 3 && (
        <Binaries onContinue={() => setStep(4)} onReturn={() => setStep(2)} />
      )}
      {step === 4 && (
        <SendingPage onSend={() => setStep(5)} onReturn={() => setStep(3)} />
      )}
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
    <div className={`container ${styles.container}`}>
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
    </div>
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
    <div className={`container ${styles.container}`}>
      <h1 className="centered">
        Qué tanto <b className="text-primary">te gusta...</b>
      </h1>
      <h2 className="centered">El cine... 🚬</h2>
      <RangeSlider value={moviesTaste} onChange={setMoviesTaste} />
      <h2 className="centered">La fiesta... 🎉</h2>
      <RangeSlider value={partiesTaste} onChange={setPartiesTaste} />
      <h2 className="centered">Los conciertos... 🎤</h2>
      <RangeSlider value={concertsTaste} onChange={setConcertsTaste} />
      <div className="row-container">
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
    </div>
  );
}

function Categories({ onContinue, onReturn }) {
  function handleNavigation(callback) {
    setData({
      ...data,
      favMusicGenres: musicGenres,
      mostImportantAttr: personCh,
    });
    callback();
  }

  const { data, setData } = useFormData();

  const [musicGenres, setMusicGenres] = useState(data.favMusicGenres ?? []);
  const [personCh, setPersonCh] = useState(data.mostImportantAttr ?? "");

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="centered">
        Elige
        <b className="text-primary"> sabiamente...</b>
      </h1>
      <h2 className="centered">¿Cuáles son tus géneros musicales favoritos?</h2>
      <CategoryGroup state={musicGenres} setState={setMusicGenres}>
        {MUSIC_GENRES.map((genre) => (
          <CategoryOption key={genre} value={genre} text={genre} />
        ))}
      </CategoryGroup>
      <h2 className="centered">
        ¿Qué consideras más importante en una persona?
      </h2>
      <CategoryGroup state={personCh} setState={setPersonCh} type="one">
        {PERSON_CHARACTERISTICS.map((ch) => (
          <CategoryOption key={ch} value={ch} text={ch} />
        ))}
      </CategoryGroup>
      <div className="row-container">
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
    </div>
  );
}

function Binaries({ onContinue, onReturn }) {
  function handleNavigation(callback) {
    setData({
      ...data,
      catsOrDogs,
      messiOrCristiano,
      backOrFront,
      marvelOrDC,
    });
    callback();
  }
  const { data, setData } = useFormData();

  const [catsOrDogs, setCatsOrDogs] = useState(data.catsOrDogs ?? -1);
  const [messiOrCristiano, setMessiOrCristiano] = useState(
    data.messiOrCristiano ?? -1
  );
  const [backOrFront, setBackOrFront] = useState(data.backOrFront ?? -1);
  const [marvelOrDC, setMarvelOrDC] = useState(data.marvelOrDC ?? -1);

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="centered">
        ¿Qué <b className="text-primary">prefieres?</b>
      </h1>
      <div className="row-container">
        <h3>Gatos</h3>
        <b className="text-primary">VS</b>
        <h3>Perros</h3>
      </div>
      <ImagesContainer>
        <SelectableImage
          src="/cat.jpg"
          selected={catsOrDogs === 0}
          onClick={() => setCatsOrDogs(0)}
        />
        <SelectableImage
          src="/dog.jpg"
          selected={catsOrDogs === 1}
          onClick={() => setCatsOrDogs(1)}
        />
      </ImagesContainer>
      <Divider />
      <div className="row-container">
        <h3>Messi</h3>
        <b className="text-primary">VS</b>
        <h3>CR7</h3>
      </div>
      <ImagesContainer>
        <SelectableImage
          src="/messi.jpg"
          selected={messiOrCristiano === 0}
          onClick={() => setMessiOrCristiano(0)}
        />
        <SelectableImage
          src="/cr7.gif"
          selected={messiOrCristiano === 1}
          onClick={() => setMessiOrCristiano(1)}
        />
      </ImagesContainer>
      <Divider />
      <div className="row-container">
        <h3>Frontend</h3>
        <b className="text-primary">VS</b>
        <h3>Backend</h3>
      </div>
      <ImagesContainer>
        <SelectableImage
          src="/frontend.jpg"
          selected={backOrFront === 0}
          onClick={() => setBackOrFront(0)}
        />
        <SelectableImage
          src="/backend.jpg"
          selected={backOrFront === 1}
          onClick={() => setBackOrFront(1)}
        />
      </ImagesContainer>
      <Divider />
      <div className="row-container">
        <h3>Marvel</h3>
        <b className="text-primary">VS</b>
        <h3>DC</h3>
      </div>
      <ImagesContainer>
        <SelectableImage
          src="/marvel.jpg"
          selected={marvelOrDC === 0}
          onClick={() => setMarvelOrDC(0)}
        />
        <SelectableImage
          src="/dc.jpg"
          selected={marvelOrDC === 1}
          onClick={() => setMarvelOrDC(1)}
        />
      </ImagesContainer>
      <div className="row-container">
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
    </div>
  );
}

function SendingPage({ onSend, onReturn }) {
  const { data } = useFormData();

  return (
    <div className={`container ${styles.container}`}>
      <p>
        Sólo puedes enviar este formulario una vez. Te has registrado como
        <b className="text-primary"> {data.email}</b>, ¿seguro que quieres
        enviarlo?
      </p>
      <div className="row-container">
        <button style={{ width: "100%" }} onClick={onReturn}>
          VOLVER
        </button>
        <button style={{ width: "100%" }} onClick={onSend}>
          ENVIAR
        </button>
      </div>
    </div>
  );
}

export default UserForm;
