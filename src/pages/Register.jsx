import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ContractContext } from "../context/contractContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const { address } = useContext(ContractContext);

  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const form = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setUserInputs((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmpty = () => {
    if (
      userInputs.username === "" ||
      userInputs.email === "" ||
      userInputs.password === "" ||
      userInputs.confirmPassword === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // perform validation
    if (checkEmpty() || !form.current.checkValidity()) {
      console.log("Form is invalid");
      // form.current.reportValidity();
      setError("Inputs are invalid");
      return;
    }

    try {
      const user = {
        ...userInputs,
        address,
      };
      await register(user);
      navigate("/login");
    } catch (error) {
      // log the status code and error message
      console.log(error.response.status, error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Sign up
        </h1>
        <form className="mt-6" ref={form}>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-md font-bold text-gray-800"
            >
              User
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="block w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500
                         invalid:border-red-500 peer/username"
              value={userInputs.username}
              onChange={handleChange}
              pattern={"[a-zA-Z0-9]{3,}"}
            />
            <span className="text-sm text-red-500 hidden peer-placeholder-shown/username:!hidden peer-invalid/username:block">
              Invalid user name
            </span>
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-md font-bold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="block w-full px-4 py-2 mt-2 text-sm border rounded-md
                         focus:border-blue-500 focus:outline-blue-500
                          invalid:border-red-500 peer/email"
              value={userInputs.email}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 hidden peer-placeholder-shown/email:!hidden peer-invalid/email:block">
              Invalid email
            </span>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-md font-bold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full px-4 py-2 mt-2 text-sm border rounded-md
                        focus:border-blue-500 focus:outline-blue-500
                          invalid:border-red-500 peer/password"
              pattern={"[a-zA-Z0-9!@#$%^&*()-=_+]{6,}"}
              value={userInputs.password}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 hidden peer-placeholder-shown/password:!hidden peer-invalid/password:block">
              Password should be at least 6 characters
            </span>
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-md font-bold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Retype your password"
              className="block w-full px-4 py-2 mt-2 text-sm border rounded-md
                        focus:border-blue-500 focus:outline-blue-500
                        invalid:border-red-500 peer/confirmPassword"
              name="confirmPassword"
              value={userInputs.confirmPassword}
              pattern={userInputs.password}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 hidden peer-placeholder-shown/confirmPassword:!hidden peer-invalid/confirmPassword:block">
              Passwords do not match
            </span>
          </div>
          <div className="flex justify-center text-sm text-gray-500">
            <span>
              Already have an account?{" "}
              <Link to="/Login">
                <span className="text-blue-400 hover:text-blue-600 hover:underline">
                  Login
                </span>
              </Link>
            </span>
          </div>
          <div className="mt-6">
            {error && (
              <div className="text-sm text-center text-red-500">{error}</div>
            )}
            <button
              className="w-full px-4 py-2 font-bold tracking-wider text-white rounded-md
                        bg-blue-500 hover:bg-blue-700 focus:outline-none active:shadow-lg"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
