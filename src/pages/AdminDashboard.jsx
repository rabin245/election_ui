function AdminDashboard() {
  return (
    <div className="adminDashboard relative">
      <div className="p-3 bg-blue-500 flex justify-between items-center">
        <span className="font-semibold text-white text-3xl">
          Admin dashboard
        </span>

        <div className="w-8 h-8 flex justify-center items-center bg-teal-700 rounded-full text-white font-medium text-base cursor-pointer  active:ring-white active:ring-1">
          R
        </div>
      </div>

      <div className="flex">
        <div className="w-64 h-screen bg-blue-300 sticky top-0 flex justify-center ">
          <ul className="pt-12 w-full flex flex-col text-white font-bold  ">
            <li className="hover:bg-blue-500 hover:shadow w-full text-center cursor-pointer">
              Dashboard
            </li>
            <li className="hover:bg-blue-500 hover:shadow  w-full text-center cursor-pointer  ">
              Results
            </li>
          </ul>
        </div>

        <main className="p-2 flex flex-col justify-center items-center w-full">
          <button className="bg-blue-400 rounded-2xl p-5 text-white text-2xl font-bold hover:shadow-xl active:ring active:ring-blue-100">
            Start election
          </button>
          <button className="mt-8 bg-blue-400 rounded-2xl p-5 text-white text-2xl font-bold hover:shadow-xl active:ring active:ring-blue-100">
            End election
          </button>
          <span className="mt-8">The election has not started yet.</span>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
