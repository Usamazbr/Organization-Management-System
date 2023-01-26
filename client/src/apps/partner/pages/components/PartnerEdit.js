import { useState, useRef } from "react";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useRolesContext } from "../../context/rolesContext";
import { usePartnersContext } from "../../context/partnersContext";

const PartnerEdit = ({ id, editState }) => {
  const { roles } = useRolesContext();
  const { partnerDispatch } = usePartnersContext();
  const [selectedRole, setSelectedRole] = useState([]);
  const nameRef = useRef("");
  const positionRef = useRef("");
  const ageRef = useRef(0);
  const phoneRef = useRef(0);
  const [err, setErr] = useState(null);

  console.log(roles);

  const settingRoles = ({ target }) => {
    const currentRole = roles.filter(({ Role }) => Role === target.value)[0];

    setSelectedRole((prev) => [...prev, currentRole]);
  };

  const filteredRole = roles?.filter(
    ({ _id }) => !selectedRole.map(({ _id }) => _id).includes(_id)
  );

  const submitEditedUser = async (e) => {
    e.preventDefault();
    setErr(null);

    const permissionSet = selectedRole.map(({ Permissions }) =>
      Permissions.map((id) => Number(id))
    );

    const permissions = Array.from(new Set(permissionSet.flat()));

    const apiUrl = `http://localhost:5033/api/user/data/edit/${id}`;

    const username = nameRef.current.value;
    const age = ageRef.current.value;
    const position = positionRef.current.value;
    const phone = phoneRef.current.value;

    let patchData = {
      username,
      age,
      position,
      phone,
    };

    patchData = Object.fromEntries(
      Object.entries(patchData).filter(([_, value]) => value !== "")
    );

    if (permissions[0] !== undefined) {
      console.log(permissions[0]);
      patchData = { ...patchData, permissions };
    }

    console.log(patchData);

    axios
      .patch(apiUrl, patchData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(async ({ data }) => {
        await partnerDispatch({ type: "UPDATE", payload: data.data });
        e.target.reset();
        setSelectedRole([]);
        editState();
      })
      .catch((error) => {
        if (error.response) {
          setErr(error.response.data.err);
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

  return (
    <div className="flex flex-col pl-1">
      <form
        onSubmit={submitEditedUser}
        className="flex flex-row p-1 justify-between text-neutral-700 border border-black rounded-lg"
      >
        <div className="flex flex-col">
          <label className="flex flex-row w-48 justify-between">
            Name:
            <input
              ref={nameRef}
              // value={name}
              className="my-1 px-1 w-32 text-neutral-300 bg-black rounded-lg"
              type="text"
              // onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="flex flex-row w-48 justify-between border">
            Age:
            <input
              ref={ageRef}
              // value={age}
              className="my-1 px-1 w-32 text-neutral-300 bg-black rounded-lg"
              type="number"
              // onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="flex flex-row w-48 justify-between">
            Phone:
            <input
              ref={phoneRef}
              // value={phone}
              className="my-1 px-1 w-32 text-neutral-300 bg-black rounded-lg"
              type="number"
              // onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label className="flex flex-row w-48 justify-between">
            Position:
            <input
              ref={positionRef}
              // value={subs}
              className="my-1 px-1 w-32 text-neutral-300 bg-black rounded-lg"
              type="text"
              // onChange={(e) => setSubs(e.target.value)}
            />
          </label>
        </div>

        <div>
          <div
            className={`flex flex-col mx-auto m-1 px-2 w-fit ${
              selectedRole[0] && "border"
            } border-red-700 rounded-md`}
          >
            {selectedRole?.map(({ _id, Role }) => (
              <button
                type="button"
                onClick={() => {
                  setSelectedRole((prev) =>
                    prev.filter((role) => role._id !== _id)
                  );
                  console.log(selectedRole);
                }}
                key={_id}
              >
                {Role}
              </button>
            ))}
          </div>

          <label className="flex flex-row w-48 justify-between">
            Buckets:
            <select
              id="selectedRole"
              className="m-1 px-1 w-32 bg-gray-600 text-gray-300 rounded-lg"
              onChange={settingRoles}
            >
              <option>select</option>
              {filteredRole?.map(({ _id, Role }) => (
                <option key={_id}>{Role}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="my-auto w-fit">
          <button
            // onClick={stuSubmit}
            className="m-auto px-2 bg-stone-900 text-neutral-400 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-full"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={editState}
            className="my-auto px-2 text-lg hover:text-red-600 rounded-xl"
          >
            <MdOutlineCancel />
          </button>
        </div>
      </form>
      {err && (
        <div className="mt-1 mx-auto px-2 border border-red-700 text-red-700 rounded-xl">
          {`Error: ${err}`}
        </div>
      )}
    </div>
  );
};

export default PartnerEdit;
