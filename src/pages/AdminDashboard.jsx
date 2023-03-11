import { useContext } from "react";
import { ContractContext } from "../context/contractContext";

function AdminDashboard() {
  const { startElection, endElection, isElectionStarted } =
    useContext(ContractContext);

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen p-4 bg-white lg:ml-64 flex flex-col justify-center items-center">
        <button
          className="bg-blue-500 p-4 w-44 text-2xl font-bold text-white rounded-lg hover:shadow-md hover:bg-blue-600 active:ring-1 active:ring-gray-400"
          onClick={startElection}
        >
          Start
        </button>

        <button
          className="mt-4 bg-blue-500 p-4 w-44 text-2xl font-bold text-white rounded-lg hover:shadow-md hover:bg-blue-600 active:ring-1 active:ring-gray-400"
          onClick={endElection}
        >
          End
        </button>

        <p className="mt-4 w-3/4 text-center">
          {isElectionStarted
            ? "Election has started"
            : "Election has not started"}
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
