import axios from "axios";
import { useVer } from "../../../../context/VerContext";
import { useRolesContext } from "../../context/rolesContext";
import { usePermsContext } from "../../context/permissionsContext";
import { MdDeleteForever } from "react-icons/md";

export const RolesDashboard = () => {
  // const context = useRolesContext();
  const { roles, dispatch } = useRolesContext();
  const { permissions } = usePermsContext();
  const { user } = useVer();

  const deleteRole = async (id) => {
    const apiUrl = `http://localhost:5033/api/admin/role/delete/${id}`;

    axios
      .delete(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async ({ data }) => {
        await dispatch({ type: "DELETE", payload: data.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log("Error", error.message);
        console.log(error);
      });
  };

  const getPermission = (permission_id) => {
    const thisPermission = permissions.filter(({ id }) => id === permission_id);
    return thisPermission[0].name;
  };
  return (
    <div className="flex flex-col m-2 h-fit w-1/2 transition-transform duration-200 border border-black shadow-lg shadow-gray-600/50 rounded-md">
      <div className="flex flex-row mx-auto mt-2 text-xl">
        List of{" "}
        {
          <h3 className="text-green-600 font-semibold mx-1 px-1 border-2 border-green-600 shadow-lg shadow-gray-600/50 rounded-lg">{` Buckets `}</h3>
        }{" "}
        of Permissions
      </div>

      {roles?.map(({ _id, Role, Permissions }) => (
        <div
          className="flex flex-row-reverse m-1 px-2 justify-between border border-neutral-400 rounded-md"
          key={_id}
        >
          <button
            type="button"
            onClick={() => deleteRole(_id)}
            className="my-auto px-2 text-2xl hover:text-red-600 rounded-xl"
          >
            <MdDeleteForever />
          </button>
          <div className="flex flex-col">
            {Role}
            {Permissions.map((id) => (
              <p key={id} className="flex flex-col">
                └ {id + ` `}
                {getPermission(id)}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
