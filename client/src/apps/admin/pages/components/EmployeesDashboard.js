import axios from "axios";
import { usePartnersContext } from "../../context/partnersContext";

const EmployeesDashboard = () => {
  const { partners, partnerDispatch } = usePartnersContext();

  const filtered = partners?.filter(({ admin }) => admin === 2);

  const deleteRole = async (id) => {
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

  return (
    <div className="h-96 w-full">
      <div className="flex flex-col w-full">
        {filtered?.map(({ _id, image, username, email, position }) => (
          <div key={_id} className="flex flex-row justify-around">
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
              onClick={() => deleteRole(_id)}
              className="my-auto px-2 border border-transparent hover:border-red-600 hover:text-red-600 rounded-xl"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesDashboard;
