import { useState } from "react";
import { FormDataContext } from "../contexts/form-data-context";
import { useQuery } from "react-query";
import { getForm } from "../api/fetchers";
import { LOCAL_STORAGE_ID } from "../constants/constants";

export default function FormRecovery({ children }) {
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
    overnightOrMorning: undefined,
  });

  useQuery({
    queryFn: () => getForm(window.localStorage.getItem(LOCAL_STORAGE_ID)),
    queryKey: "form",
    onSuccess: (data) => {
      setData(data);
    },
    onError: () => {
      window.localStorage.removeItem(LOCAL_STORAGE_ID);
    },
    enabled: Boolean(window.localStorage.getItem(LOCAL_STORAGE_ID)),
  });

  return (
    <FormDataContext.Provider value={{ data, setData }}>
      {children}
    </FormDataContext.Provider>
  );
}
