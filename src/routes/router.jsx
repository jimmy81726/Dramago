import { createBrowserRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import Home from "../pages/front/Home";
import DramaList from "../pages/front/DramaList";
import DramaDetail from "../pages/front/DramaDetail";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import DramaCreate from "../pages/front/DramaCreate";

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
        path: "dramas/:id",
        element: <DramaDetail />,
      },
      { path: "dramas/create", element: <DramaCreate /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
]);
