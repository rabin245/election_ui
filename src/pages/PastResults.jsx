import { ContractContext } from "../context/contractContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { BarChart } from "../components/BarChart";

const PastResults = () => {
  const { electionsTimeList: timeList, pastElections } =
    useContext(ContractContext);

  const [electionsTimeList, setElectionsTimeList] = useState([]);
  const [selectedElectionResult, setSelectedElectionResult] = useState([]);
  const [pastElectionResults, setPastElectionResults] = useState({});

  useEffect(() => {
    setElectionsTimeList(timeList);

    setPastElectionResults(pastElections);
  }, [pastElections]);

  const sortedElectionResult = useMemo(
    () =>
      selectedElectionResult.sort((a, b) => {
        const aVotes = parseInt(a.votes);
        const bVotes = parseInt(b.votes);
        return bVotes - aVotes;
      }),
    [selectedElectionResult]
  );

  const handleSelect = (e) => {
    const time = parseInt(e.target.value);
    setSelectedElectionResult(pastElectionResults[time]);
  };

  const returnDate = (time) => {
    const date = new Date(time);
    // return date.toDateString();  // will use this later
    return date.toLocaleString();
  };

  const chartData = useMemo(() => {
    return {
      labels: selectedElectionResult.map((candidate) => candidate.name),
      datasets: [
        {
          label: "Votes",
          data: selectedElectionResult.map((candidate) => candidate.votes),
          backgroundColor: ["rgb(96 165 250)", "rgb(56 189 248)"],
          borderWidth: 1,
        },
      ],
    };
  }, [selectedElectionResult]);

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
          <div className="my-2">
            <select
              className="p-2 rounded-md border border-gray-300 text-md font-semibold 
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                        block w-full lg:w-1/2"
              name="time"
              id="time"
              onChange={handleSelect}
            >
              <option value="none" selected disabled hidden>
                Select an election
              </option>
              {electionsTimeList.map((time) => (
                <option key={time} value={time}>
                  {returnDate(time)}
                </option>
              ))}
            </select>
          </div>
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
              {selectedElectionResult.lengt > 0 &&
                sortedElectionResult.map((row, index) => (
                  <tr key={row.id} className="even:bg-blue-100">
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.partyName}</td>
                    <td>{row.votes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {selectedElectionResult.length > 0 && (
          <BarChart chartData={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default PastResults;
