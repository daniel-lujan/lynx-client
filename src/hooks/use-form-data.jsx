import { useContext } from "react";
import { FormDataContext } from "../contexts/form-data-context";

export default function useFormData() {
  return useContext(FormDataContext);
}
