import { createBrowserRouter } from "react-router-dom";
import UserForm from "./user-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserForm />,
  },
  {
    path: "/results",
    element: <h1>Results</h1>,
  },
]);
