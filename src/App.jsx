import AdminDashboard from "./pages/AdminDashboard";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import VoterDashboard from "./pages/VoterDashboard";
import Results from "./pages/Results";
import Login from "./pages/Login";

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
      {
        path: "/",
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
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
