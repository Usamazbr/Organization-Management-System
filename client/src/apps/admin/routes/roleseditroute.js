import { useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { RolesDashboard } from "../pages/components/RolesDashboard";

const CustomRoles = lazy(() => import("../pages/customroles"));

const AdminApp2 = () => {
  // const { user } = useVer();

  // const [teacDet, setTeacDet] = useState();

  useEffect(() => {}, []);
  return (
    <div className="flex flex-row p-2 w-5/6 h-160 mx-auto rounded-lg">
      <Routes>
        <Route
          path="/*"
          element={
            <div className="flex flex-col m-4 w-full">
              <h1 className="text-xl font-semibold">View</h1>
              <RolesDashboard />
            </div>
          }
        />
        <Route path="/customroles" element={<CustomRoles />} />
        {/* <Route path="/partnersdb" element={<Partners />} /> */}
      </Routes>
    </div>
  );
};

export default AdminApp2;
