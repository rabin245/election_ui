import axios from "axios";
import { useRef, useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { login, test } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await login(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500 ">
          Login
        </h1>
        <form className="mt-6">
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
                         focus:border-blue-500 focus:outline-blue-500 "
              ref={email}
              required
            />
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
              ref={password}
              required
            />
          </div>
          <div className="mt-6">
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
