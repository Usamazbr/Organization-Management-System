import PartnersDashboard from "./components/PartnersDashboard";

const Dashboard = () => {
  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-900 via-blue-800 to-purple-500">
          View Roaster
        </h1>
      </div>
      <div className="mx-4 p-3 w-5/6 bg-stone-200 border border-stone-300 shadow-lg shadow-gray-600/50 rounded-xl">
        <PartnersDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
