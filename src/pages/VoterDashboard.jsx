import { useContext, useState } from "react";
import CandidatesList from "../components/CandidatesList";
import { ContractContext } from "../context/contractContext";

function VoterDashboard() {
  const [currentCandidate, setCurrrentCandidate] = useState(null);

  const { voteToCandidate } = useContext(ContractContext);

  const handleVote = () => {
    console.log("Voting to candidate: ", currentCandidate);
    voteToCandidate(currentCandidate);
  };

  const selectCurrentCandidate = (id) => {
    setCurrrentCandidate(id);
  };

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64 ">
        <CandidatesList
          currentCandidate={currentCandidate}
          onClick={selectCurrentCandidate}
        />
        <div
          className={`voteDiv sticky bottom-0 p-6 
          backdrop-blur-sm bg-white/40 flex justify-end 
          ${currentCandidate !== null ? "visible" : "hidden"}`}
        >
          <button
            className=" mt-4 bg-blue-500 p-3 w-28 text-md font-bold text-white rounded-lg hover:shadow-2xl hover:bg-blue-600 active:ring-1 active:ring-blue-800"
            onClick={handleVote}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
