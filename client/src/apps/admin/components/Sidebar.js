import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ handleState }) => {
  const [border, setBorder] = useState(1);

  return (
    <div className="w-1/6 p-2 px-4 space-y-2 border border-gray-400 shadow-lg shadow-gray-600/50 rounded-lg">
      <div className="shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 h-10 w-20 bg-stone-900 rounded-lg">
        <Link to="/admin">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "bg-gradient-to-r from-stone-900 via-neutral-200 to-neutral-300 text-black hover:text-current rounded-r-none"
            }
            `}
            onClick={() => handleState(0)}
          >
            {`< Home`}
          </button>
        </Link>
      </div>
      <div className="shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 h-10 bg-stone-900 rounded-lg">
        <Link to="/admin/partnersdb">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 2 &&
              "bg-gradient-to-r from-stone-900 via-neutral-200 to-neutral-300 text-black hover:text-current rounded-r-none"
            }
            `}
            onClick={() => setBorder(2)}
          >
            {" "}
            Partners Database
          </button>
        </Link>
      </div>
      <div className="shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 h-10 bg-stone-900 rounded-lg">
        <Link to="/admin/employeedb">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "bg-gradient-to-r from-stone-900 via-neutral-200 to-neutral-300 text-black hover:text-current rounded-r-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
            Employee Database
          </button>
        </Link>
      </div>
      <div className="shadow-lg shadow-slate-500/50 hover:transform transition-transform duration-500 delay-100 hover:scale-90 h-10 bg-stone-900 rounded-lg">
        <Link to="/admin/settings">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 4 &&
              "bg-gradient-to-r from-stone-900 via-neutral-200 to-neutral-300 text-black hover:text-current rounded-r-none"
            }
            `}
            onClick={() => setBorder(4)}
          >
            {" "}
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
