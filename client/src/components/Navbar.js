import { Link } from "react-router-dom";
import { useVer } from "../context/VerContext";
import { useLogout } from "./Logout";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const { user } = useVer();
  const [dropDown, setDropDown] = useState(false);
  // const [effect, setEffect] = useState(false);
  const clickRef = useRef(null);
  const { logout } = useLogout();

  useEffect(() => {
    function handleClickOutside(event) {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const handleClick = () => {
    // setEffect(true);
    logout();
  };

  // const button = document.querySelector("button");

  // button.addEventListener("mousedown", () => {
  //   setEffect(true);
  // });

  // button.addEventListener("mouseup", () => {
  //   setEffect(false);
  // });

  return (
    <header className="flex flex-row m-2 mb-6 justify-between shadow-lg active:shadow-none shadow-slate-500/50 bg-stone-200 rounded-md">
      <Link className="" to={`/`}>
        <h1 className="text-3xl font-bold m-3 text-blue-700 shadow-neutral-500/50 hover:text-white leading-tight text-center">
          Employee Management System
        </h1>
      </Link>
      {/* <div className="w-5/12 "></div> */}
      <nav className="flex flex-col justify-center mr-2 text-blue-700">
        {user ? (
          <div className="flex flex-row relative m-auto rounded-lg">
            <button
              // type="button"
              onClick={() => setDropDown((s) => !s)}
              className={`flex flex-row p-2 px-3 pr-4 border border-transparent hover:border-blue-700 hover:text-lg transition-all duration-500 bg-size-200 hover:shadow-lg shadow-gray-600/50 ${
                dropDown ? "text-lg" : ""
              } rounded-lg`}
            >
              <p className="">{user.username}</p>
              <div className="relative h-4 w-1 ">
                <p className="absolute top-2 text-lg">🢓</p>
              </div>
            </button>
            {dropDown && (
              <div
                ref={clickRef}
                className="flex flex-col absolute flyout top-10 p-2 z-50 w-fit border-black 
                transition-all transform duration-500 delay-100 bg-slate-800 rounded-lg"
              >
                <h4 className="px-2 text-slate-200 rounded-lg">{user.email}</h4>
                <button className="p-1 border border-transparent hover:border-blue-700 rounded-lg">
                  Prof Settings
                </button>
                <button className="p-1 border border-transparent hover:border-blue-700 rounded-lg">
                  Prof Settings
                </button>
              </div>
            )}

            <span className="p-2 pt-3 rounded-lg">
              {
                {
                  1: <p className="text-red-700 rounded-lg">(Admin)</p>,
                  2: <p>(Admin User)</p>,
                  3: <p>(Employee)</p>,
                }[user.admin]
              }
            </span>
            <button
              type="button"
              className={`m-1 p-2 border border-blue-700 bg-transparent hover:shadow-lg 
              active:bg-red-500 active:text-neutral-300
              shadow-gray-600/50 rounded-lg hover:rounded-2xl duration-500`}
              onClick={handleClick}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="m-4">
            <Link
              className={`m-2 p-2 hover:text-green-600 border border-purple-700
                            ${"active:bg-green-500 active:text-neutral-300"} 
               hover:border-green-700 rounded-lg hover:rounded-2xl duration-500`}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={`m-2 p-2 hover:text-blue-600 border border-purple-700
                            ${"active:bg-blue-500 active:text-neutral-300"}  
              hover:border-blue-700 rounded-lg hover:rounded-2xl duration-500`}
              to="/signup"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
