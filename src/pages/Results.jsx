function Results() {
  const data = [
    {
      id: 1,
      name: "Candidate 1",
      votes: 100,
    },
    {
      id: 2,
      name: "Candidate 2",
      votes: 200,
    },
    {
      id: 3,
      name: "Candidate 3",
      votes: 300,
    },
    {
      id: 4,
      name: "Candidate 4",
      votes: 400,
    },
    {
      id: 5,
      name: "Candidate 5",
      votes: 500,
    },
    {
      id: 6,
      name: "Candidate 6",
      votes: 600,
    },
    {
      id: 7,
      name: "Candidate 7",
      votes: 700,
    },
    {
      id: 8,
      name: "Candidate 8",
      votes: 800,
    },
    {
      id: 9,
      name: "Candidate 9",
      votes: 900,
    },
  ];

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
                <th>Acquired Votes</th>
              </tr>
            </thead>
            <tbody className="border border-gray-300  ">
              {data.map((row) => (
                <tr className="even:bg-blue-100">
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.votes}</td>
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
