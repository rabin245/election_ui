import AdminDashboard from "./pages/AdminDashboard";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import VoterDashboard from "./pages/VoterDashboard";
import Results from "./pages/Results";
import LandingPage from "./pages/LandingPage";

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
