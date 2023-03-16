import { useContext, useEffect, useMemo, useState } from "react";
import { ContractContext } from "../context/contractContext";
import { CategoryScale, Chart } from "chart.js/auto";
import { BarChart } from "../components/BarChart";

Chart.register(CategoryScale);

function Results() {
  const { candidates: cands, recentResults } = useContext(ContractContext);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    console.log("length of results", recentResults.length);
    if (recentResults.length > 0) setCandidates(recentResults);
    else setCandidates(cands);
  }, [cands, recentResults]);

  const resultsList = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const aVotes = parseInt(a.votes);
      const bVotes = parseInt(b.votes);
      return bVotes - aVotes;
    });
  }, [candidates]);

  const chartData = useMemo(() => {
    return {
      labels: candidates.map((candidate) => candidate.name),
      datasets: [
        {
          label: "Votes",
          data: candidates.map((candidate) => candidate.votes),
          backgroundColor: ["rgb(96 165 250)", "rgb(56 189 248)"],
          borderWidth: 1,
        },
      ],
    };
  }, [candidates]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

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
            <tbody className="border border-gray-300">
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
        <BarChart chartData={chartData} options={options} />
      </div>
    </div>
  );
}

export default Results;
