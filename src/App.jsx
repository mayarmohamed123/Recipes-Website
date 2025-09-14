import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/Home/HomePage";
import DetailsPage from "./Pages/Details/DetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "meal/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
