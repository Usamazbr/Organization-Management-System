import { useState, useRef } from "react";
import axios from "axios";
import { useVer } from "../../../../context/VerContext";
import { useRolesContext } from "../../context/rolesContext";
import { usePermsContext } from "../../context/permissionsContext";

export const RolesForm = () => {
  const [selectedPerms, setSelectedPerms] = useState([]);
  const { user } = useVer();
  const { dispatch } = useRolesContext();
  const { permissions } = usePermsContext();
  const [err, setErr] = useState(null);

  const roleRef = useRef("");
  const apiUrl = `http://localhost:5033/api/admin/role/data`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      current: { value },
    } = roleRef;

    const PermissionIds = selectedPerms.map(({ id }) => id);

    const data = { Role: value, Permissions: PermissionIds };

    // sending request
    await axios
      .post(apiUrl, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async ({ data }) => {
        await dispatch({ type: "CREATE", payload: data.data });
        e.target.reset();
        setSelectedPerms([]);
        setErr(null);
      })
      .catch(({ response, message }) => {
        if (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          setErr(response.data.err);
        } else {
          console.log("Error", message);
        }
      });
  };

  const settingPermissions = ({ target }) => {
    const currentPerm = permissions.filter(
      ({ name }) => name === target.value
    )[0];

    setSelectedPerms((prev) => [...prev, currentPerm]);
  };

  const filteredPerm = permissions.filter(
    ({ id }) => !selectedPerms.map(({ id }) => id).includes(id)
  );

  //   const delPermission = (_id) => {
  //     // setSelectedPerms((prev) => prev.filter(({ id }) => id !== _id.id));
  //     console.log(_id);
  //   };

  return (
    <div className="flex flex-col m-2 py-4 h-fit w-1/2 border border-black shadow-lg shadow-gray-600/50 rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col m-2 p-1">
        <h2 className="mx-auto text-xl">Add New Bucket</h2>

        <label className="flex flex-row justify-around">
          Bucket Name:
          <input
            ref={roleRef}
            type="text"
            placeholder="Bucket: {...permissions}"
            className="px-1 bg-gray-600 text-gray-400 placeholder:italic placeholder:text-yellow-600 hover:shadow-lg shadow-gray-600/50 rounded-lg"
          />
        </label>

        {/* { list of permissions } */}
        <div
          className={`flex flex-col mx-auto m-1 px-2 ${
            selectedPerms[0] && "border"
          } border-red-700 rounded-md`}
        >
          {selectedPerms?.map(({ id, name }) => (
            <button
              type="button"
              onClick={() => {
                setSelectedPerms((prev) =>
                  prev.filter((perm) => perm.id !== id)
                );
                console.log(selectedPerms);
              }}
              key={id}
            >
              {name}
            </button>
          ))}
        </div>

        <label className="flex flex-row justify-around">
          Permission:
          <select
            id="selectedPerms"
            className="m-1 pl-1 w-44 bg-gray-600 text-gray-300 rounded-lg"
            onChange={settingPermissions}
          >
            <option className="rounded-lg">select</option>
            {filteredPerm.map(({ id, name }) => (
              <option className="rounded-lg" key={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <button className="m-auto px-2 mt-2 border border-gray-700 hover:shadow-lg shadow-gray-600/50 rounded-md">
          Submit
        </button>

        {err && (
          <button
            type="button"
            onClick={() => setErr(null)}
            className="error mx-auto mt-1 p-1 px-2 text-red-400 border border-red-400 rounded-xl"
          >
            {err}
          </button>
        )}
      </form>
    </div>
  );
};
