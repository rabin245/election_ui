import AdminDashboard from "./pages/AdminDashboard";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import VoterDashboard from "./pages/VoterDashboard";
import Results from "./pages/Results";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Layout = () => {
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
        element: <LandingPage />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/voter",
        element: <VoterDashboard />,
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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
