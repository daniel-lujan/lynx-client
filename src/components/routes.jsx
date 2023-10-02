import { createBrowserRouter } from "react-router-dom";
import UserForm from "./user-form";
import ResultsPage from "../pages/results";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
]);
