import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const LoginVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { verify } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const { email, address } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email: email,
        address: address,
        otp: code,
      };

      await verify(user);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen p-2">
      <div
        className="flex flex-col justify-center md:max-w-xl w-full m-auto
                    p-6 shadow-md rounded-md"
      >
        <h1 className="text-3xl font-semibold text-center text-blue-500 ">
          2-Step Verification
        </h1>

        <div className="my-4">
          <label
            htmlFor="code"
            className="block text-lg font-bold text-gray-800"
          >
            Enter your verification code
          </label>

          <h3 className="text-md font-light">
            We sent the code to <span className="font-normal">{email}</span>
          </h3>

          <input
            type="text"
            name="code"
            placeholder="Enter your code"
            className="w-full px-4 py-2 mt-2 text-sm border rounded-md
                      focus:outline-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="flex justify-center text-sm text-gray-500">
          {/* <span>
            Didn't receive the code?{" "}
            <span className="text-blue-400 hover:text-blue-600 hover:underline">
              Resend
            </span>
          </span>

          <span className="mx-2">|</span> */}

          <span>
            <Link to="/login">
              <span className="text-blue-400 hover:text-blue-600 hover:underline">
                Back to login
              </span>
            </Link>
          </span>
        </div>

        <div className="mt-4">
          {error && (
            <div className="text-sm text-center text-red-500">{error}</div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white hover:shadow-md
                      bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginVerification;
