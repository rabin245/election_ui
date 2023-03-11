import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Results from "./pages/Results";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { ContractContext } from "./context/contractContext";
import MetaMaskError from "./pages/MetaMaskError";

const Layout = () => {
  const { provider, signer, contract } = useContext(ContractContext);

  console.log(provider, signer, contract);

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // check the auth context to load the
      // dashboard or the landing page
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/results",
        element: <Results />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  const { isMetaMaskInstalled } = useContext(ContractContext);

  return (
    <div className="App">
      {isMetaMaskInstalled ? (
        <RouterProvider router={router} />
      ) : (
        <MetaMaskError />
      )}
    </div>
  );
}

export default App;
