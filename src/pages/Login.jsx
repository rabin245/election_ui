import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const form = useRef(null);

  const checkEmpty = () => {
    if (userInputs.email === "" || userInputs.password === "") {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setUserInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation
    if (checkEmpty() || !form.current.checkValidity()) {
      console.log("Form is invalid");
      setError("Inputs are invalid");
      return;
    }

    try {
      const user = {
        email: userInputs.email,
        password: userInputs.password,
      };

      await login(user);
      navigate("/");
    } catch (error) {
      console.log(error.response.status, error.response.data);

      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500 ">
          Login
        </h1>
        <form className="mt-6" ref={form}>
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
                        focus:border-blue-500 focus:outline-blue-500"
              value={userInputs.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center text-sm text-gray-500">
            <span>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-blue-400 hover:text-blue-600 hover:underline">
                  Register
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
