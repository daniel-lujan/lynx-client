import { useQuery } from "react-query";
import { getResults } from "../api/fetchers";
import { LOCAL_STORAGE_ID } from "../constants/constants";
import AnimatedPage from "../components/animated-page";
import GlobalLoader from "../components/global-loader";
import { useNavigate } from "react-router";
import UserCard from "../components/user-card";

export default function ResultsPage() {
  const navigate = useNavigate();

  const { isLoading, data, isSuccess } = useQuery({
    queryFn: () => getResults(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    onError: () => navigate("/"),
    enabled: Boolean(window.localStorage.getItem(LOCAL_STORAGE_ID)),
  });

  return (
    <AnimatedPage>
      {isLoading && <GlobalLoader />}
      <h1 className="centered">Resultados</h1>
      <p>
        Aquí tienes a tu <b className="text-primary">pareja ideal:</b>
      </p>
      {isSuccess && (
        <UserCard {...data.bestMatch} perfectMatch={data.perfectMatch} />
      )}
    </AnimatedPage>
  );
}
