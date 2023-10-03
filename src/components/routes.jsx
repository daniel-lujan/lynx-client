import { createBrowserRouter } from "react-router-dom";
import UserForm from "./user-form";
import ResultsPage from "../pages/results";
import AdminPage from "../pages/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
