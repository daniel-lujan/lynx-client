import { useQuery } from "react-query";
import { getResults } from "../api/fetchers";
import { LOCAL_STORAGE_ID } from "../constants/constants";
import AnimatedPage from "../components/animated-page";
import GlobalLoader from "../components/global-loader";
import UserCard from "../components/user-card";
import EstablishmentCard from "../components/establishment-card";
import { useState } from "react";
import { motion } from "framer-motion";
import { FADE } from "../constants/animations";
import FancyInput from "../components/fancy-input";
import { AtSymIcon, NotFoundIcon } from "../components/icons";

export default function ResultsPage() {
  const { isLoading, data, isSuccess, refetch, error } = useQuery({
    queryFn: () => getResults(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    enabled: Boolean(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    onError: () => {
      window.localStorage.removeItem(LOCAL_STORAGE_ID);
    },
  });

  const [showMore, setShowMore] = useState(false);
  const [email, setEmail] = useState("");

  if (!isSuccess)
    return (
      <>
        {isLoading && <GlobalLoader />}
        <AnimatedPage>
          <h1 className="centered">Resultados</h1>
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
          {error?.response.status === 404 && (
            <p
              className="text-error"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <NotFoundIcon />
              <b>No hay resultados para tí &nbsp;☹️</b>
            </p>
          )}
          <button
            onClick={() => {
              window.localStorage.setItem(LOCAL_STORAGE_ID, email);
              refetch();
            }}
          >
            Obtener resultados
          </button>
        </AnimatedPage>
      </>
    );

  return (
    <AnimatedPage>
      <h1 className="centered">Resultados</h1>
      <p>
        Aquí tienes a tu <b className="text-primary">pareja ideal:</b>
      </p>
      <UserCard {...data.bestMatch} perfectMatch={data.perfectMatch} />
      {showMore ? (
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          variants={FADE}
          initial="initial"
          animate="animate"
        >
          <p>
            Y puedes pasar una <b className="text-primary">noche de pasión</b>{" "}
            con ella en:
          </p>
          <EstablishmentCard {...data.nearestEstablishment} />
        </motion.div>
      ) : (
        <button onClick={() => setShowMore(true)}>Mostrar más</button>
      )}
    </AnimatedPage>
  );
}
