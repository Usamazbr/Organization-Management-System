import PartnerForm from "./components/PartnerForm";
import PartnersDashboard from "./components/PartnersDashboard";

const Dashboard = () => {
  return (
    <div className="m-1 h-full w-full rounded-lg">
      <div className="flex flex-row m-1 h-10 w-fit rounded-lg">
        <h2 className="px-2 justify-start text-lg text-orange-800 font-semibold">
          Admin Body Database
        </h2>
      </div>
      <div className="flex flex-row justify-between m-2 h-fit rounded-lg">
        <div className="mx-1 w-2/3 border border-blue-300 shadow-lg shadow-gray-600/50 rounded-xl">
          <PartnersDashboard />
        </div>
        <div className="w-1/3">
          <PartnerForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
