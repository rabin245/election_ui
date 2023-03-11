import NonAuthLandingPage from "./NonAuthLandingPage";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import VoterDashboard from "./VoterDashboard";
import AdminDashboard from "./AdminDashboard";

function Home() {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <>
      {user ? (
        isAdmin ? (
          <AdminDashboard />
        ) : (
          <VoterDashboard />
        )
      ) : (
        <NonAuthLandingPage />
      )}
    </>
  );
}

export default Home;
