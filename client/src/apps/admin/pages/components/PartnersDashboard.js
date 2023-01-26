import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import axios from "axios";
import { usePartnersContext } from "../../context/partnersContext";
import PartnerEdit from "./PartnerEdit";

const PartnersDashboard = () => {
  const [editUser, setEditUser] = useState("");
  const { partners, partnerDispatch } = usePartnersContext();

  console.log(partners);

  const filtered = partners?.filter(({ admin }) => admin === 2);

  const deleteUser = async (id) => {
    const apiUrl = `http://localhost:5033/api/user/data/delete/${id}`;

    axios
      .delete(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(async ({ data }) => {
        await partnerDispatch({ type: "DELETE", payload: data.data });
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

  const resetEditUser = () => setEditUser("");

  return (
    <div className="h-96 w-full">
      <div className="flex flex-col w-full">
        {filtered?.map(({ _id, image, username, email, position }) => (
          <div key={_id} className="flex flex-col justify-around mr-4">
            <div className="flex flex-row">
              <img
                height={30}
                width={60}
                src={image}
                className="p-1 rounded-lg"
                alt="No img"
              />
              <p className="flex m-auto px-2 border border-black rounded-lg">
                {username}
              </p>
              <p className="flex m-auto px-2 border border-black rounded-lg">
                {email}
              </p>
              <p className="flex m-auto px-2 border border-black rounded-lg">
                {position}
              </p>

              <button
                type="button"
                onClick={() => setEditUser(_id)}
                className="my-auto px-2 hover:text-amber-600 rounded-xl"
              >
                <RiEditBoxLine />
              </button>

              <button
                type="button"
                onClick={() => deleteUser(_id)}
                className="my-auto px-2 text-lg hover:text-red-600 rounded-xl"
              >
                <MdDeleteForever />
              </button>
            </div>

            {editUser === _id && (
              <PartnerEdit id={_id} editState={resetEditUser} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersDashboard;
