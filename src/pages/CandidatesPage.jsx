import { useState } from "react";
import CandidatesList from "../components/CandidatesList";

const CandidatesPage = () => {
  const [currentCandidate, setCurrrentCandidate] = useState(null);

  const selectCurrentCandidate = (id) => {
    setCurrrentCandidate(id);
  };

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64">
        <CandidatesList
          currentCandidate={currentCandidate}
          onClick={selectCurrentCandidate}
        />
      </div>
    </div>
  );
};

export default CandidatesPage;
