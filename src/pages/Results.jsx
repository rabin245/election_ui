import { useContext, useMemo } from "react";
import { ContractContext } from "../context/contractContext";

function Results() {
  const { candidates } = useContext(ContractContext);

  const resultsList = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const aVotes = parseInt(a.votes.toString());
      const bVotes = parseInt(b.votes.toString());
      return bVotes - aVotes;
    });
  }, [candidates]);

  return (
    <div className="mainDiv">
      {/* main body */}
      <div className="mainContent h-screen bg-white lg:ml-64 ">
        <div className="py-16 px-12">
          <table className="table-auto border-collapse w-full text-center">
            <thead className="shadow-md shadow-gray-400 border border-blue-400 bg-blue-400 text-white font-bold text-md">
              <tr>
                <th>Pos</th>
                <th>Name</th>
                <th>Party Name</th>
                <th>Acquired Votes</th>
              </tr>
            </thead>
            <tbody className="border border-gray-300  ">
              {resultsList.map((row, index) => (
                <tr key={row.id.toString()} className="even:bg-blue-100">
                  <td>{index}</td>
                  <td>{row.name}</td>
                  <td>{row.partyName}</td>
                  <td>{row.votes.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Results;
