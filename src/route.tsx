import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";

// TODO: eslint(react-refresh/only-export-components)
// export const router = createBrowserRouter([

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Navigate to="/" />,
      },
      {
        path: "about",
        element: <>about</>,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
