import { useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { useVer } from "../../context/VerContext";
const Dashboard = lazy(() => import("../pages/dashboard"));
const Partners = lazy(() => import("../pages/partners"));
const Employees = lazy(() => import("../pages/employees"));
const Settings = lazy(() => import("../pages/settings"));

const AdminApp = () => {
  // const { user } = useVer();

  // const [teacDet, setTeacDet] = useState();

  useEffect(() => {}, []);
  return (
    <div className="flex flex-row p-2 w-5/6 h-160 mx-auto rounded-lg">
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/partnersdb" element={<Partners />} />
        <Route path="/employeedb" element={<Employees />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default AdminApp;
