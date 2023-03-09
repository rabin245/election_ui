import { useState, useContext } from "react";
import logo from "../assets/ballot.png";
import SideBarToggleButton from "./SideBarToggleButton";
import SideBarButton from "./SideBarButton";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function Hr() {
  return <hr className="bg-gray-600 h-px border-0 my-2" />;
}

function SideBar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* toggle button */}
      <SideBarToggleButton
        open={open}
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* sidebar */}
      <div
        className={`sidebar fixed top-0 bottom-0 bg-gray-900 p-2 lg:left-0 overflow-y-auto overflow-x-hidden w-64 text-center z-2 shadow-xl shadow-black
         ${open ? "left-0 " : "-left-64"} 
          transition-all duration-500 ease-in-out
        `}
      >
        <div className="headingPart text-gray-100 mt-1 flex items-center justify-between">
          <div className="flex items-center p-2">
            <Link to="/">
              <img src={logo} alt="logo" className="h-8 " />
            </Link>
            <h1 className="text-2xl font-bold ml-3">Election</h1>
          </div>
          {/* close button */}
          <span
            className="mr-1 cursor-pointer lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 "
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
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
          <div
            onClick={() => {
              // logout function and redirect
            }}
          >
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
            <span>0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SideBar;
