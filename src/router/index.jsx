import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailedPage, HomePage } from "../pages";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/detailed-product/:id",
          element: <DetailedPage />,
        },
      ],
      {
        future: {
          v7_skipActionErrorRevalidation: true,
        },
      });
    return <RouterProvider router={router} />;
};

export default AppRouter;

 




