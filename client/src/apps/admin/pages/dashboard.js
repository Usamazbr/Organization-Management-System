import PartnersDashboard from "./components/PartnersDashboard";

const Dashboard = () => {
  return (
    <div className="mx-1 w-full border border-blue-300 shadow-lg shadow-gray-600/50 rounded-xl">
      <div className="w-full">
        <PartnersDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
