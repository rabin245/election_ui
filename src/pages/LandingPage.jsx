import { Link } from "react-router-dom";
import Image from "../assets/image.jpg";

function LandingPage() {
  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen p-4 bg-white lg:ml-64 flex flex-col items-center">
        <h2 className="text-xl">Welcome to the Election Voting App</h2>
        <img className="h-2/5" src={Image} alt="some image" />
        <h4 className="text-sm font-light">
          <Link to="/login" className="hover:font-normal hover:underline">
            Login
          </Link>{" "}
          to vote
        </h4>
        <div className="self-start ml-36">
          <p>Things to know:</p>
          <ul>
            <ol className="list-item list-disc">
              Do not share your login credentials
            </ol>
            <ol className="list-item list-disc">
              You can cast your vote only once
            </ol>
            <ol className="list-item list-disc">
              Tranasctions may take some time due to the large number of
              requests
            </ol>
            <ol className="list-item list-disc">
              You can view the results in the results page
            </ol>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
