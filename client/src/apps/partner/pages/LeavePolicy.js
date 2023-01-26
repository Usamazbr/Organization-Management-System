import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useVer } from "../../../context/VerContext";

export const LeavesDashboard = ({ leaveData }) => {
  return (
    <div className="flex flex-col p-2 pb-4 w-1/3 space-y-2 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
      {leaveData &&
        leaveData.map(({ id, amount }) => (
          <div
            key={id}
            className={`flex flex-row p-3 w-full text-lg ${
              {
                a: "text-blue-700",
                b: "text-amber-500",
                c: "text-red-600",
              }[id]
            } justify-between`}
          >
            {{ a: <p>Annual</p>, c: <p>Casual</p>, s: <p>Sick</p> }[id]}
            <p className="px-1 border border-slate-500 shadow-lg shadow-slate-500/50 rounded-md">
              {amount}
            </p>
          </div>
        ))}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useVer();
  const annualLeaves = useRef("");
  const casualLeaves = useRef("");
  const sickLeaves = useRef("");
  const [leaveData, setLeaveData] = useState([]);
  const apiServerDataUrl = `http://localhost:5033/api/admin/leaves/data`;

  useEffect(() => {
    // fetching leaves from server
    axios
      .get(apiServerDataUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => setLeaveData(data))
      .catch((error) => console.log(error));
  }, [user, apiServerDataUrl]);

  const changeLeaves = async (e) => {
    e.preventDefault();

    const aleaves = annualLeaves.current.value;
    const cleaves = casualLeaves.current.value;
    const sleaves = sickLeaves.current.value;

    let patchData = [
      { id: "a", amount: Number(aleaves) },
      { id: "c", amount: Number(cleaves) },
      { id: "s", amount: Number(sleaves) },
    ];

    patchData = patchData.filter(({ amount }) => amount !== "");

    console.log(patchData);

    // patching leaves from server
    axios
      .patch(apiServerDataUrl, patchData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => setLeaveData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-900 via-blue-800 to-purple-500">
          Customize Leave Policy
        </h1>
      </div>
      <div className="flex flex-row h-fit mx-4 m-2 p-3 justify-between space-x-10 rounded-lg">
        <form
          onSubmit={changeLeaves}
          className="flex flex-col p-2 pb-4 w-1/3 space-y-4 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg"
        >
          <h2 className="p-2 mx-auto text-xl">Edit</h2>

          <label className="flex flex-row justify-around">
            🔵 Annual Leaves:
            <input
              ref={annualLeaves}
              type="number"
              placeholder="Per anum"
              className="px-1 bg-gray-600 text-gray-400 placeholder:italic placeholder:text-yellow-600 hover:shadow-lg shadow-gray-600/50 rounded-lg"
            />
          </label>

          <label className="flex flex-row justify-around">
            🟡 Casual Leaves:
            <input
              ref={casualLeaves}
              type="number"
              placeholder="Per anum"
              className="px-1 bg-gray-600 text-gray-400 placeholder:italic placeholder:text-yellow-600 hover:shadow-lg shadow-gray-600/50 rounded-lg"
            />
          </label>

          <label className="flex flex-row justify-around">
            🔴 Sick Leaves:
            <input
              ref={sickLeaves}
              type="number"
              placeholder="Per anum"
              className="px-1 bg-gray-600 text-gray-400 placeholder:italic placeholder:text-yellow-600 hover:shadow-lg shadow-gray-600/50 rounded-lg"
            />
          </label>

          <button className="m-auto px-2 mt-2 border border-gray-700 hover:shadow-lg shadow-gray-600/50 rounded-md">
            Submit
          </button>
        </form>
        <LeavesDashboard leaveData={leaveData} />
      </div>
    </div>
  );
};

export default Dashboard;
