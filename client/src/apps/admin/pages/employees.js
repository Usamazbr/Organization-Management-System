import EmployeeForm from "./components/EmployeeForm";
import EmployeesDashboard from "./components/EmployeesDashboard";

const Dashboard = () => {
  return (
    <div className="m-1 h-full w-full border border-blue-900 rounded-lg">
      <div className="flex flex-row m-1 h-10 w-fit border border-blue-900 rounded-lg">
        <h2 className="px-2 justify-start text-lg text-orange-800 font-semibold">
          Employees Database
        </h2>
      </div>
      <div className="flex flex-row justify-between m-2 h-fit border border-blue-900 rounded-lg">
        <div className="w-2/3">
          <EmployeesDashboard />
        </div>
        <div className="w-1/3">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
