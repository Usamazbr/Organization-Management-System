import { useState, useRef } from "react";
import axios from "axios";
import { useVer } from "../../../../context/VerContext";
import { useRolesContext } from "../../context/rolesContext";
import { usePartnersContext } from "../../context/partnersContext";

const PartnerForm = () => {
  const { user } = useVer();
  const { roles } = useRolesContext();
  const { partnerDispatch } = usePartnersContext();
  const [selectedRole, setSelectedRole] = useState([]);
  const [image, setImage] = useState("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const ageRef = useRef(0);
  const positionRef = useRef("");
  const phoneRef = useRef(0);
  const [err, setErr] = useState(null);
  const apiUrl = `http://localhost:5033/api/user/signup`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    let permissionSet = selectedRole.map(({ Permissions }) =>
      Permissions.map((id) => Number(id))
    );
    permissionSet = Array.from(new Set(permissionSet.flat()));
    // console.log(permissionSet);

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const age = ageRef.current.value;
    const position = positionRef.current.value;
    const phone = phoneRef.current.value;

    const data = {
      image,
      username: name,
      email,
      age,
      position,
      phone,
      admin: 2,
      organization: user.organization,
      permissions: permissionSet,
      admin_id: user._id,
    };

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
        await partnerDispatch({ type: "CREATE", payload: data });
        console.log(data);
        e.target.reset();
        setSelectedRole([]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setErr(error.response.data.err);
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

  const settingRoles = ({ target }) => {
    const currentRole = roles.filter(({ Role }) => Role === target.value)[0];

    setSelectedRole((prev) => [...prev, currentRole]);
  };

  const filteredRole = roles?.filter(
    ({ _id }) => !selectedRole.map(({ _id }) => _id).includes(_id)
  );

  const fileSelect = ({ target }) => {
    const file = target.files[0];
    console.log(file.name);
    const fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.onload = () => setImage(fileRead.result);
  };

  return (
    <div className="flex flex-col w-full p-2 border border-blue-300 shadow-lg shadow-gray-600/50 rounded-xl">
      <h2 className="flex mx-auto m-1 px-2 text-xl border border-neutral-500 shadow-lg shadow-gray-600/50 rounded-lg">
        Install New Employee
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col text-neutral-600">
        <label className="flex flex-row mx-2">
          <p className="w-1/4 my-auto">Picture:</p>
          <input
            // style={{ display: "none" }}
            type="file"
            className="flex w-3/4 shadow-inner py-1
              file:py-1 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-700 file:text-gray-100
              hover:file:bg-gray-500 hover:file:scale-95 transition-transform duration-700"
            onChange={fileSelect}
          />
        </label>

        <div className="flex flex-col text-neutral-500">
          <label className="flex flex-row justify-around">
            Name:
            <input
              ref={nameRef}
              // value={name}
              className="my-1 px-1 bg-black rounded-lg"
              type="text"
              // onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="flex flex-row justify-around">
            Email:
            <input
              ref={emailRef}
              // value={email}
              className="my-1 px-1 bg-black rounded-lg"
              type="text"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-row justify-around">
            Age:
            <input
              ref={ageRef}
              // value={age}
              className="my-1 px-1 bg-black rounded-lg"
              type="number"
              // onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="flex flex-row justify-around">
            Position:
            <input
              ref={positionRef}
              // value={subs}
              className="my-1 px-1 bg-black rounded-lg"
              type="text"
              // onChange={(e) => setSubs(e.target.value)}
            />
          </label>

          {/* { list of permissions } */}
          <div
            className={`flex flex-col mx-auto m-1 px-2 ${
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

          <label className="flex flex-row justify-around">
            Buckets:
            <select
              id="selectedRole"
              className="m-1 px-1 w-44 bg-gray-600 text-gray-300 rounded-lg"
              onChange={settingRoles}
            >
              <option>select</option>
              {filteredRole?.map(({ _id, Role }) => (
                <option key={_id}>{Role}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-row justify-around">
            Phone:
            <input
              ref={phoneRef}
              // value={phone}
              className="my-1 px-1 bg-black rounded-lg"
              type="number"
              // onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <button
          // onClick={stuSubmit}
          className="mx-auto w-40 mt-2 px-2 bg-stone-900 text-neutral-400 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-full"
        >
          Submit
        </button>
        {err && (
          <div className="mt-1 mx-auto px-2 border border-red-700 text-red-700 rounded-xl">
            {`Error: ${err}`}
          </div>
        )}
      </form>
    </div>
  );
};

export default PartnerForm;
