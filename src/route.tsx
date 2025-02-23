import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";

// TODO: eslint(react-refresh/only-export-components)
// export const router = createBrowserRouter([

const baseUrl = import.meta.env.VITE_BASE_URL || '/'
console.log('routes baseUrl', baseUrl)

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
], {
  basename: baseUrl,
});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
