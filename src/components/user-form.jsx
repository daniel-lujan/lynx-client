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
import {
  GOOGLE_MAPS_API_KEY,
  MUSIC_GENRES,
  PERSON_CHARACTERISTICS,
} from "../constants/constants";
import SelectableImage, { ImagesContainer } from "./selectable-image";
import Divider from "./divider";
import { AnimatePresence, motion } from "framer-motion";
import { CONTAINER } from "../constants/animations";
import { useMutation } from "react-query";
import { postForm } from "../api/fetchers";
import GlobalLoader from "./global-loader";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map, { MapContainer, Marker } from "./map";

function UserForm() {
  const [step, setStep] = useState(0);

  return (
    <FormRecovery>
      <AnimatePresence mode="wait">
        {step === 0 && <BasicData key="basic" onContinue={() => setStep(1)} />}
        {step === 1 && (
          <Tastes
            key="tastes"
            onContinue={() => setStep(2)}
            onReturn={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <Categories
            key="categories"
            onContinue={() => setStep(3)}
            onReturn={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Binaries
            key="binaries"
            onContinue={() => setStep(4)}
            onReturn={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <FavoriteLocation
            key="favorite-location"
            onContinue={() => setStep(5)}
            onReturn={() => setStep(3)}
          />
        )}
        {step === 5 && (
          <SendingPage
            key="sending-page"
            onSent={() => setStep(6)}
            onReturn={() => setStep(4)}
          />
        )}
      </AnimatePresence>
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
    <motion.div
      className={`container ${styles.container}`}
      key="basic-data"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
    </motion.div>
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
    <motion.div
      className={`container ${styles.container}`}
      key="tastes"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="centered">
        Qué tanto <b className="text-primary">te gusta...</b>
      </h1>
      <h2 className="centered">El cine... 🚬</h2>
      <RangeSlider value={moviesTaste} onChange={setMoviesTaste} />
      <h2 className="centered">La fiesta... 🎉</h2>
      <RangeSlider value={partiesTaste} onChange={setPartiesTaste} />
      <h2 className="centered">Los conciertos... 🎤</h2>
      <RangeSlider value={concertsTaste} onChange={setConcertsTaste} />
      <Divider />
      <NavigationButtons
        handler={handleNavigation}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </motion.div>
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
    <motion.div
      className={`container ${styles.container}`}
      key="categories"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
      <Divider />
      <h2 className="centered">
        ¿Qué consideras más importante en una persona?
      </h2>
      <CategoryGroup state={personCh} setState={setPersonCh} type="one">
        {PERSON_CHARACTERISTICS.map((ch) => (
          <CategoryOption key={ch} value={ch} text={ch} />
        ))}
      </CategoryGroup>
      <Divider />
      <NavigationButtons
        handler={handleNavigation}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </motion.div>
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
    <motion.div
      className={`container ${styles.container}`}
      key="binaries"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
      <Divider />
      <NavigationButtons
        handler={handleNavigation}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </motion.div>
  );
}

function FavoriteLocation({ onContinue, onReturn }) {
  function handleNavigation(callback) {
    setData({
      ...data,
      mapPoint: {
        lat: point.lat(),
        lng: point.lng(),
      },
    });
    callback();
  }

  const { data, setData } = useFormData();

  const [point, setPoint] = useState(
    data.mapPoint ? new window.google.maps.LatLng(data.mapPoint) : {}
  );
  const [zoom, setZoom] = useState(12); // initial zoom
  const [center, setCenter] = useState({
    lat: 6.247191923448905,
    lng: -75.56574135933879,
  });

  const onClick = (e) => {
    setPoint(e.latLng);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    const c = m.getCenter();
    if (c) {
      setCenter(c.toJSON());
    }
  };

  return (
    <motion.div
      className={`container ${styles.container}`}
      key="sending-page"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="centered">
        Punto favorito <b className="text-primary">de Medellín</b>
      </h1>
      <p className="text-opaque centered">
        Escoge tu lugar favorito de la ciudad
      </p>
      <Divider />
      <MapContainer>
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "100%" }}
            fullscreenControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            clickableIcons={false}
            minZoom={11}
            maxZoom={15}
          >
            {point.lat && <Marker position={point} />}
          </Map>
        </Wrapper>
      </MapContainer>
      <Divider />
      <NavigationButtons
        handler={handleNavigation}
        onContinue={onContinue}
        onReturn={onReturn}
      />
    </motion.div>
  );
}

function SendingPage({ onSent, onReturn }) {
  const { data } = useFormData();

  const { isLoading, mutate } = useMutation({
    mutationFn: postForm,
    onSuccess: onSent,
  });

  return (
    <motion.div
      className={`container ${styles.container}`}
      key="sending-page"
      variants={CONTAINER}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {isLoading && <GlobalLoader />}
      <p>
        Sólo puedes enviar este formulario una vez. Te has registrado como
        <b className="text-primary"> {data.email}</b>, ¿seguro que quieres
        enviarlo?
      </p>
      <div className="row-container">
        <button style={{ width: "100%" }} onClick={onReturn}>
          VOLVER
        </button>
        <button style={{ width: "100%" }} onClick={() => mutate(data)}>
          ENVIAR
        </button>
      </div>
    </motion.div>
  );
}

function NavigationButtons({ handler, onContinue, onReturn }) {
  return (
    <div className="row-container">
      <button style={{ width: "100%" }} onClick={() => handler(onReturn)}>
        VOLVER
      </button>
      <button style={{ width: "100%" }} onClick={() => handler(onContinue)}>
        CONTINUAR
      </button>
    </div>
  );
}

export default UserForm;
