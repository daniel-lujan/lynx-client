import { useQuery } from "react-query";
import { getResults } from "../api/fetchers";
import { LOCAL_STORAGE_ID } from "../constants/constants";
import AnimatedPage from "../components/animated-page";
import GlobalLoader from "../components/global-loader";
import { useNavigate } from "react-router";
import UserCard from "../components/user-card";
import EstablishmentCard from "../components/establishment-card";
import { useState } from "react";
import { motion } from "framer-motion";
import { FADE } from "../constants/animations";

export default function ResultsPage() {
  const navigate = useNavigate();

  const { isLoading, data, isSuccess } = useQuery({
    queryFn: () => getResults(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    onError: () => navigate("/"),
    enabled: Boolean(window.localStorage.getItem(LOCAL_STORAGE_ID)),
  });

  const [showMore, setShowMore] = useState(false);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (!isSuccess) return null;

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
            Y puedes pasar con ella una{" "}
            <b className="text-primary">noche de pasión</b> en:
          </p>
          <EstablishmentCard {...data.nearestEstablishment} />
        </motion.div>
      ) : (
        <button onClick={() => setShowMore(true)}>Mostrar más</button>
      )}
    </AnimatedPage>
  );
}
