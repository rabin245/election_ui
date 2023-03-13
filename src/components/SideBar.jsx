import { useState, useContext } from "react";
import logo from "../assets/ballot.png";
import SideBarToggleButton from "./SideBarToggleButton";
import SideBarButton from "./SideBarButton";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { ContractContext } from "../context/contractContext";

function Hr() {
  return <hr className="bg-gray-600 h-px border-0 my-2" />;
}

function SideBar() {
  const navigate = useNavigate();

  const { user, isAdmin, logout } = useContext(AuthContext);
  const { address, isElectionStarted } = useContext(ContractContext);
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/");
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* toggle button */}
      <SideBarToggleButton
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* sidebar */}
      <div
        className={`sidebar fixed top-0 bottom-0 bg-gray-900 p-2 lg:left-0 overflow-y-auto overflow-x-hidden w-64 text-center z-20 shadow-lg shadow-black 
         ${open ? "left-0 " : "-left-64"} 
          transition-all duration-500 ease-in-out
        `}
      >
        <div className="headingPart text-gray-100 mt-1 flex items-center justify-between">
          <div className="flex items-center py-2 px-4">
            <Link to="/">
              <img src={logo} alt="logo" className="h-8" />
            </Link>
            <h1 className="text-2xl font-bold ml-2">Election</h1>
          </div>

          <div className="flex items-center">
            {/* chip */}
            {isElectionStarted ? (
              <div className="bg-gray-800 rounded-full py-1 px-[6px] text-xs font-bold relative flex shadow-lg">
                <span className="text-green-400 inline">Election</span>
                <span className="absolute flex h-3 w-3 -top-1 right-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-full py-1 px-[6px] text-xs font-bold relative flex shadow-lg">
                <span className="text-red-400 inline">Election</span>
                <span className="absolute h-3 w-3 -top-1 right-0">
                  <span className="inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
            )}
            {/* close button */}
            <span
              className="cursor-pointer lg:hidden ml-1"
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <Hr />

        <Link to="/">
          <SideBarButton title="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </SideBarButton>
        </Link>

        {(isAdmin || !user) && (
          <Link to="/candidates">
            <SideBarButton title="Candidates">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-list-details"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M13 5h8"></path>
                <path d="M13 9h5"></path>
                <path d="M13 15h8"></path>
                <path d="M13 19h5"></path>
                <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
              </svg>
            </SideBarButton>
          </Link>
        )}

        {isAdmin && (
          <Link to="/candidates/new">
            <SideBarButton title="New Candidate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user-plus"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
              </svg>
            </SideBarButton>
          </Link>
        )}

        <Link to="/results">
          <SideBarButton title="Results">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-file-analytics"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
              <path d="M9 17l0 -5"></path>
              <path d="M12 17l0 -1"></path>
              <path d="M15 17l0 -3"></path>
            </svg>
          </SideBarButton>
        </Link>

        <Hr />

        {user ? (
          <div onClick={handleLogOut}>
            <SideBarButton title="Logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </SideBarButton>
          </div>
        ) : (
          <Link to="/login">
            <SideBarButton title="Login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </SideBarButton>
          </Link>
        )}

        {user ? (
          <div className="text-white absolute bottom-1 flex flex-wrap w-56 text-xs break-all">
            {/* display public address if logged in */}
            <span>{address}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SideBar;
