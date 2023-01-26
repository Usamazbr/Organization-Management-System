import { Link } from "react-router-dom";
import { useState } from "react";
import { useAllowedPermsContext } from "../context/permissionsContext";

const NavbarPartner = () => {
  const [border, setBorder] = useState(1);
  const { permissions } = useAllowedPermsContext();

  return (
    <div className="flex flex-row w-full p-2 px-4 space-x-2 overflow-scroll scrollbar rounded-lg">
      <div
        className={`shadow-lg shadow-slate-500/50 hover:transform transition-transform 
        duration-500 delay-100 hover:scale-90 bg-blue-900 rounded-lg ${
          border === 1 && "shadow-none"
        }`}
      >
        <Link to="/partner">
          <button
            className={`h-full w-full px-2 text-blue-400 hover:bg-blue-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "bg-gradient-to-b from-blue-900 to-neutral-300 text-black hover:text-current rounded-b-none"
            }
            `}
            onClick={() => setBorder(1)}
          >
            {`Home`}
          </button>
        </Link>
      </div>
      {permissions?.map(({ id, name }) => (
        <div
          key={id}
          className={`flex shadow-lg text-blue-400 hover:text-blue-900 
          shadow-slate-500/50 hover:transform transition-transform duration-500 
          delay-100 hover:scale-90 bg-blue-900 hover:bg-blue-500 
          hover:font-semibold rounded-lg ${
            border === id &&
            `shadow-none bg-gradient-to-b from-blue-900 to-neutral-300 
            text-blue-900 font-semibold rounded-b-none`
          }`}
        >
          <Link to={`/partner/permission_id=` + id}>
            <button
              className={`h-full w-full p-2 px-4  rounded-lg`}
              onClick={() => setBorder(id)}
            >
              {name}
            </button>
          </Link>
        </div>
      ))}
      <div
        className={`shadow-lg shadow-slate-500/50 hover:transform transition-transform 
        duration-500 delay-100 hover:scale-90 bg-blue-900 rounded-lg ${
          border === 3 && "shadow-none"
        }`}
      >
        <Link to="/partner/settings">
          <button
            className={`h-full w-full px-2 text-blue-400 hover:bg-blue-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "bg-gradient-to-b from-blue-900 to-neutral-300 text-black hover:text-current rounded-b-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPartner;
