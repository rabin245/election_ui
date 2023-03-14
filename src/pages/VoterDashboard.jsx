import { useContext, useState } from "react";
import CandidatesList from "../components/CandidatesList";
import { ContractContext } from "../context/contractContext";
import { useNavigate } from "react-router-dom";

function VoterDashboard() {
  const navigate = useNavigate();

  const [currentCandidate, setCurrrentCandidate] = useState(null);

  const { voteToCandidate, isElectionStarted, hasVoted } =
    useContext(ContractContext);

  const handleVote = () => {
    if (!hasVoted) {
      console.log("Voting to candidate: ", currentCandidate);
      voteToCandidate(currentCandidate);
      navigate("/results");
      return;
    }
    alert("You have already voted!!");
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
                      disabled:opacity-80 disabled:cursor-not-allowed ${
                        hasVoted && "cursor-not-allowed opacity-80"
                      }
                      flex justify-center items-center`}
            onClick={handleVote}
            disabled={!isElectionStarted}
          >
            {hasVoted ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-discount-check-filled"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    strokeWidth={0}
                    fill="currentColor"
                  ></path>
                </svg>
                <span>Voted</span>
              </>
            ) : (
              <span>Vote</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;
