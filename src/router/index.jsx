import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddModal, DetailedPage, EditModal, HomePage } from "../pages";


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
        {
          path:"/edit-product/:id" ,
          element: <EditModal />,  
        },
        {
          path:"/add-product" ,
          element: <AddModal />,
        }
      ],
      {
        future: {
          v7_skipActionErrorRevalidation: true,
        },
      });
    return <RouterProvider router={router} />;
};

export default AppRouter;

 




