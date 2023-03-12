import Banner from "../assets/banner.png";

const CreateCandidate = () => {
  return (
    <div className="mainDiv">
      <div className="mainContent min-h-screen bg-white lg:ml-64">
        <div className="">
          <div className="banner">
            <img src={Banner} alt="banner" />
          </div>
          <div className="px-4 py-2 max-w-screen-sm">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">
                Add Candidate
              </h1>

              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                />
              </div>

              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Party
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                />
              </div>

              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                />
              </div>

              <div className="mt-2">
                <button className="bg-blue-500 p-3 w-44 text-md font-bold text-white rounded-lg hover:shadow-2xl hover:bg-blue-600 active:ring-1 active:ring-gray-400">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidate;
