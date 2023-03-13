import Banner from "../assets/banner.png";
import UserIcon from "../assets/userIcon.png";
import ResultIcon from "../assets/resultIcon.png";
import CandidatesIcon from "../assets/candidatesIcon.png";
import Card from "../components/Card";

export default function NonAuthLandingPage() {
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
            title={"Candidates"}
            icon={CandidatesIcon}
            desc={"View the candidates for the election"}
            buttonText={"View Candidates"}
            color={"purple"}
            link={"/candidates"}
          />
        </div>
      </div>
    </div>
  );
}
