import { Link } from "react-router-dom";
import Banner from "../assets/banner.png";
import UserIcon from "../assets/userIcon.png";
import ResultIcon from "../assets/resultIcon.png";
import Card from "../components/Card";

function LandingPage() {
  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64 flex flex-col ">
        <div className="banner">
          <img src={Banner} alt="banner" />
        </div>

        <div className="cards p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            title={"Register/Sign in"}
            icon={UserIcon}
            desc={"Register to vote or sign in to your account to vote"}
            buttonText={"Register/Sign in"}
            color={"blue"}
            link={"/login"}
          />

          <Card
            title={"Election Result"}
            icon={ResultIcon}
            desc={"View the election result"}
            buttonText={"Go to Result"}
            color={"indigo"}
            link={"/results"}
          />

          <Card
            title={"Election Result"}
            icon={ResultIcon}
            desc={"View the election result"}
            buttonText={"Go to Result"}
            color={"purple"}
            link={"/results"}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
