const Home = ({ handleState }) => {
  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-lg font-semibold">Home Page</h1>
      </div>
      <div className="flex flex-row h-72 mx-4 m-2 p-3 justify-between space-x-10 rounded-lg">
        <div className="flex flex-col w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
          {/* <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span> */}
          <h1 className="mx-2 text-lg font-semibold">Employee Data</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Add new individual (Partners and common employees) and edit or{" "}
            delete old ones.
            <br /> Moreover, can assign/revoke customized roles
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            onClick={() => handleState(1)}
            className="m-2 h-40 w-52 border border-black rounded-xl"
          ></button>
        </div>
        <div className="flex flex-col w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          <h1 className="mx-2 text-lg font-semibold">Customize Roles</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Customize both roles and permissions. Assign/revoke permissions to
            each role
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            onClick={() => handleState(2)}
            className="m-2 h-40 w-52 border border-black rounded-xl"
          ></button>
        </div>
        <div className="flex flex-col w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          <h1 className="mx-2 text-lg font-semibold">Settings</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Edit Settings <br /> Change Email or password
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            onClick={() => handleState(3)}
            className="m-2 h-40 w-52 border border-black rounded-xl"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
