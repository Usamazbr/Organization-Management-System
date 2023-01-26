import axios from "axios";

export const getFiles = async ({ token, _id }) => {
  const apiFileName = `http://localhost:5033/api/admin/files/${_id}`;
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  };
  // uploading to server
  axios({ method: "get", url: apiFileName, ...config })
    .then(({ data }) => {
      // setFileName(data);
      // setFileName((prev) => [...prev, ...data.data]);
      console.log(data);
    })
    .catch((error) => console.log(error));
};
