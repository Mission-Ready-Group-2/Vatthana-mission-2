import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <div>Homepage</div> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
