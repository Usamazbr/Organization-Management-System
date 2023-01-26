import { RolesForm } from "./components/RolesForm";
import { RolesDashboard } from "./components/RolesDashboard";

const CustomRoles = () => {
  return (
    <div className="flex flex-col m-2 mt-4 h-fit w-full border border-black rounded-md">
      <div className="flex flex-row">
        <RolesDashboard />
        <RolesForm />
      </div>
    </div>
  );
};

export default CustomRoles;
