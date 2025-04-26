import { createBrowserRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Home from "../pages/front/Home";
import DramaList from "../pages/front/DramaList";
import DramaDetail from "../pages/front/DramaDetail";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/front/admin/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "list",
        element: <DramaList />,
      },
      {
        path: "drama/:id",
        element: <DramaDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
]);
