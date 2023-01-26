import { lazy, Suspense } from "react";

const AllowedPermissions = lazy(() =>
  import("./components/AllowedPermissions")
);

const Loading = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-neutral-400 h-10 w-10"></div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-lg font-semibold">Home Page</h1>
      </div>
      <div className="flex flex-row h-72 mx-4 m-2 p-3 justify-between space-x-10 rounded-lg">
        <div className="flex flex-col w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          {/* <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span> */}
          {/* <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span> */}
          <h1 className="mx-2 text-lg font-semibold">Exercitation et culpa</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Some bs
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            // onClick={() => handleState(1)}
            className="m-2 h-40 w-52 border border-black rounded-xl"
          ></button>
        </div>
        <div className="flex flex-col h-fit w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          <h1 className="mx-2 text-lg font-semibold">Permissions</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Permissions allowed on this account
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            // onClick={() => handleState(2)}
            className="m-2 h-fit w-52 border border-black rounded-xl"
          >
            <Suspense fallback={<Loading />}>
              <AllowedPermissions />
            </Suspense>
          </button>
        </div>
        <div className="flex flex-col w-1/3 shadow-lg shadow-slate-500/50 bg-stone-200 hover:transform transition-transform duration-500 delay-100 hover:scale-90 rounded-lg">
          <h1 className="mx-2 text-lg font-semibold">Settings</h1>
          <h2 className="mx-3 mt-2 text-sm text-zinc-700 font-medium">
            Edit Settings <br /> Change Email or password
          </h2>
          {/* <div className="h-full w-full border border-black"></div> */}
          <button
            // onClick={() => handleState(3)}
            className="m-2 h-40 w-52 border border-black rounded-xl"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
