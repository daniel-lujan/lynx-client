import { createContext } from "react";

export const FormDataContext = createContext({
  data: {
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
  },
  setData: () => {},
});
