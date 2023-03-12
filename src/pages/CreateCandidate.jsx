import Banner from "../assets/banner.png";
import { useState, useContext } from "react";
import { nanoid } from "nanoid";
import { ContractContext } from "../context/contractContext";

const CreateCandidate = () => {
  const { addCandidate } = useContext(ContractContext);

  const initialCandidate = {
    // id: nanoid(),
    id: 0,
    name: "",
    party: "",
    image: "",
  };

  const [newCandidate, setNewCandidate] = useState(initialCandidate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newCandidate);

    setNewCandidate(initialCandidate);
    // addCandidate(newCandidate);
    addCandidate(newCandidate.id, newCandidate.name, newCandidate.party);
  };

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
                <label className="text-gray-600 font-semibold block">Id</label>
                <input
                  type="number"
                  placeholder="contract uses int for now"
                  name="id"
                  value={newCandidate.id}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCandidate.name}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Party
                </label>
                <input
                  type="text"
                  name="party"
                  value={newCandidate.party}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="text-gray-600 font-semibold block">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={newCandidate.image}
                  className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-2">
                <button
                  className="bg-blue-500 p-3 w-44 text-md font-bold text-white rounded-lg hover:shadow-2xl hover:bg-blue-600 active:ring-1 active:ring-gray-400"
                  onClick={handleSubmit}
                >
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
