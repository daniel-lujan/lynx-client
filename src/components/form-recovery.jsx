import { useState } from "react";
import { FormDataContext } from "../contexts/form-data-context";
import { useQuery } from "react-query";
import { getForm } from "../api/fetchers";
import { LOCAL_STORAGE_ID } from "../constants/constants";
import GlobalLoader from "./global-loader";

export default function FormRecovery({ children, onRecovery = () => {} }) {
  const [data, setData] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    gender: undefined,
    moviesTaste: undefined,
    concertsTaste: undefined,
    partiesTaste: undefined,
    favMusicGenres: undefined,
    mostImportantAttr: undefined,
    catsOrDogs: undefined,
    messiOrCristiano: undefined,
    backOrFront: undefined,
    marvelOrDC: undefined,
  });

  const { isLoading } = useQuery({
    queryFn: () => getForm(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    queryKey: "form",
    onSuccess: (data) => {
      setData(data);
      onRecovery();
    },
    onError: () => {
      window.localStorage.removeItem(LOCAL_STORAGE_ID);
    },
    enabled: Boolean(window.localStorage.getItem(LOCAL_STORAGE_ID)),
  });

  return (
    <FormDataContext.Provider value={{ data, setData }}>
      {isLoading && <GlobalLoader />}
      {children}
    </FormDataContext.Provider>
  );
}
