import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar2 = ({ handleState }) => {
  const [border, setBorder] = useState(1);

  return (
    <div className="flex flex-row w-full p-2 px-4 space-x-2 rounded-lg">
      <div
        className={`shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 bg-stone-900 rounded-lg ${
          border === 1 && "shadow-none"
        }`}
      >
        <Link to="/admin">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "bg-gradient-to-b from-stone-900 to-neutral-300 text-black hover:text-current rounded-b-none"
            }
            `}
            onClick={() => handleState(0)}
          >
            {`< Home`}
          </button>
        </Link>
      </div>
      <div
        className={`shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 bg-stone-900 rounded-lg ${
          border === 2 && "shadow-none"
        }`}
      >
        <Link to="/admin/customroles">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 2 &&
              "bg-gradient-to-b from-stone-900 to-neutral-300 text-black hover:text-current rounded-b-none"
            }
            `}
            onClick={() => setBorder(2)}
          >
            Customize Roles
          </button>
        </Link>
      </div>
      <div
        className={`shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 bg-stone-900 rounded-lg ${
          border === 3 && "shadow-none"
        }`}
      >
        {/* <Link to="/admin/custompermissions">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "bg-gradient-to-b from-stone-900 to-neutral-300 text-black hover:text-current rounded-b-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
            Customize Permissions
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar2;
