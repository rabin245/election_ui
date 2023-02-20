import { useState } from "react";
import CandidateCard from "../components/CandidateCard";

function VoterDashboard() {
  const candidates = [
    "Candidate 1",
    "Candidate 2",
    "Candidate 3",
    "Candidate 4",
    "Candidate 5",
    "Candidate 6",
    "Candidate 7",
    "Candidate 8",
    "Candidate 9",
  ];
  const [candidate, setCandidate] = useState(null);

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64 ">
        <div className="cardsGrid p-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {candidates.map((cand) => (
            <CandidateCard
              name={cand}
              key={cand}
              onClick={() => {
                console.log(cand);
                setCandidate(cand);
              }}
              active={candidate === cand}
            />
          ))}
        </div>
        <div
          className={`voteDiv sticky bottom-0 p-6 
          backdrop-blur-sm bg-white/40 flex justify-end 
          ${candidate !== null ? "visible" : "hidden"}`}
        >
          <button className=" mt-4 bg-blue-500 p-3 w-28 text-md font-bold text-white rounded-lg hover:shadow-2xl hover:bg-blue-600 active:ring-1 active:ring-blue-800">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
