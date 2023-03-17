import { useState, useContext } from "react";
import CandidatesList from "../components/CandidatesList";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ContractContext } from "../context/contractContext";

const CandidatesPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { isElectionStarted, emptyCandidates } = useContext(ContractContext);

  const [currentCandidate, setCurrrentCandidate] = useState(null);

  const selectCurrentCandidate = (id) => {
    setCurrrentCandidate(id);
  };

  const addNewCandidate = () => {
    navigate("/candidates/new");
  };

  const emptyCandidatesList = () => {
    if (window.confirm("Are you sure you want to empty the candidates list?"))
      emptyCandidates();
  };

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent bg-white lg:ml-64">
        {isAdmin ? (
          <div className="buttons px-4 pt-2 flex justify-end gap-2 sticky top-0">
            <div className="relative rounded-full group/add">
              <button
                className="border hover:border-blue-300 p-3 max-w-sm bg-gray-50 shadow-md
                        rounded-full hover:shadow-lg focus:outline-none hover:bg-blue-400
                        transition duration-200 each-in-out active:shadow-xl flex items-center group/addButton
                        disabled:cursor-not-allowed disabled:opacity-75"
                onClick={addNewCandidate}
                disabled={isElectionStarted}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-plus stroke-blue-500 group-hover/addButton:stroke-white"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="2.6"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M16 19h6"></path>
                  <path d="M19 16v6"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
                </svg>
              </button>
              {/* display tooltip on hover */}
              <div
                className="tooltip absolute -bottom-8 -right-1/2 bg-gray-700 text-white rounded-lg
                         text-center shadow-lg w-max px-2 py-1 z-20 text-md sm:text-sm hidden 
                         after:content-[''] after:absolute after:right-1/2 after:bottom-[100%] after:translate-x-1/2
                         after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700
                         group-hover/add:block"
              >
                Add candidate
              </div>
            </div>
            <div className="relative rounded-full group/empty">
              <button
                className="border hover:border-red-300 p-3 max-w-sm bg-gray-50 shadow-md
                        rounded-full hover:shadow-lg focus:outline-none hover:bg-red-400
                        transition duration-200 each-in-out active:shadow-xl flex items-center group/emptyButton
                        disabled:cursor-not-allowed disabled:opacity-75"
                onClick={emptyCandidatesList}
                disabled={isElectionStarted}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-playlist-x stroke-red-400 group-hover/emptyButton:stroke-white"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2.4}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 8h-14"></path>
                  <path d="M5 12h7"></path>
                  <path d="M12 16h-7"></path>
                  <path d="M16 14l4 4"></path>
                  <path d="M20 14l-4 4"></path>
                </svg>
              </button>
              <div
                className="tooltip absolute -bottom-8 -right-2 bg-gray-700 rounded-lg text-center
                          shadow-lg w-max px-2 py-1 text-white text-md sm:text-sm invisible z-20
                          after:content-[''] after:absolute after:right-6 after:bottom-[100%] 
                          after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700
                          group-hover/empty:visible duration-200 ease-in-out"
              >
                Empty all candidates
              </div>
            </div>
          </div>
        ) : null}
        <CandidatesList
          currentCandidate={currentCandidate}
          onClick={selectCurrentCandidate}
        />
      </div>
    </div>
  );
};

export default CandidatesPage;
