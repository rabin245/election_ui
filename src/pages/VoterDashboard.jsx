import { useContext, useState } from "react";
import CandidatesList from "../components/CandidatesList";
import { ContractContext } from "../context/contractContext";
import { useNavigate } from "react-router-dom";

function VoterDashboard() {
  const navigate = useNavigate();

  const [currentCandidate, setCurrrentCandidate] = useState(null);

  const { voteToCandidate, isElectionStarted } = useContext(ContractContext);

  const handleVote = () => {
    console.log("Voting to candidate: ", currentCandidate);
    voteToCandidate(currentCandidate);
    navigate("/results");
  };

  const selectCurrentCandidate = (id) => {
    setCurrrentCandidate(id);
  };

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64 ">
        {!isElectionStarted && (
          <div className=" bg-red-500 rounded-lg mx-4 mt-12 lg:mt-2 px-2 py-1 shadow-xl">
            <h1 className="text-white text-lg font-bold tracking-wide">
              Election has not started yet
            </h1>
          </div>
        )}

        <CandidatesList
          currentCandidate={currentCandidate}
          onClick={selectCurrentCandidate}
        />
        <div
          className={`voteDiv sticky bottom-0 p-6 z-10
          backdrop-blur-sm bg-white/40 flex justify-end 
          ${currentCandidate !== null ? "visible" : "hidden"}`}
        >
          <button
            className={`mt-4 bg-blue-500 p-3 w-28 text-md font-bold text-white rounded-lg hover:shadow-2xl hover:bg-blue-600 active:ring-1 active:ring-blue-800
                      ${!isElectionStarted ? "cursor-not-allowed" : ""}`}
            onClick={handleVote}
            disabled={!isElectionStarted}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
