import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { TbTrashX } from "react-icons/tb";
import { useVer } from "../../../context/VerContext";

//TODO download files on click

const Dashboard = () => {
  const {
    user: { token },
  } = useVer();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [toggleSelect, setToggleSelect] = useState(false);
  const apiFileUpload = `http://localhost:5033/api/admin/files/doc`;
  const apiFileDownload = `http://localhost:5033/api/files/doc`;
  const apiFileName = useRef("http://localhost:5033/api/admin/files/names");

  const userMem = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userMem.token}`,
      },
    };

    // fetching names from MongoDb
    const getFiles = async () => {
      await axios({ method: "get", url: apiFileName.current, ...config })
        .then(({ data }) => {
          // setFileName(data);
          setFileName(() => data.data);
          console.log(data.data);
        })
        .catch((error) => console.log(error));
    };
    getFiles();
  }, [userMem]);

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append(`file`, file[i]);
    }
    for (const [key, value] of formData) {
      console.log(`Key: ${key}`);
      console.log(`Value: ${value}`);
    }
    console.log(formData);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userMem.token}`,
      },
      onUploadProgress: ({ loaded, total }) => {
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
        }
      },
    };

    // fetching names from MongoDb
    const getFiles = async () => {
      await axios({ method: "get", url: apiFileName.current, ...config })
        .then(({ data }) => {
          // setFileName(data);
          setFileName(() => data.data);
          console.log(`Total files retrived: ` + data.data.length);
          console.log(data);
        })
        .catch((error) => console.log(error));
    };

    // uploading to server
    axios({ method: "post", url: apiFileUpload, data: formData, ...config })
      .then(({ data }) => {
        // setFileName(data);
        console.log(data);
        getFiles();
      })
      .catch((error) => console.log(error));
  };

  const handleFileSelect = async ({ target }) => {
    console.log(target.files);
    setFile(target.files);
  };

  //select files to delete
  const selectAction = ({ target }) => {
    console.log(target.value);
    console.log(target.id);
    const check = selectedFiles.find(({ id }) => id === target.id);
    console.log(check);
    if (!check) {
      setSelectedFiles((prev) => [
        ...prev,
        { id: target.id, filename: target.value },
      ]);
    } else {
      setSelectedFiles((prev) => prev.filter(({ id }) => id !== target.id));
    }

    // console.log("object");
  };

  const toggleFunc = () => {
    setToggleSelect(!toggleSelect);
    setSelectedFiles([]);
  };

  const deleteFiles = () => {
    console.log(selectedFiles);
    // selectedFiles.forEach(({ id }) => {
    //   console.log(id);
    //   setFileName((prev) => prev.filter(({ _id }) => _id !== id));
    // });
    const config = {
      // data: { files: selectedFiles },
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userMem.token}`,
      },
    };
    const url = ` ${apiFileUpload}/{"files":${JSON.stringify(selectedFiles)}}`;
    axios
      .delete(url, config)
      .then(({ data }) => {
        console.log(data);
        selectedFiles.forEach(({ id }) => {
          console.log(id);
          setFileName((prev) => prev.filter(({ _id }) => _id !== id));
        });
        setSelectedFiles([]);
        setToggleSelect(false);
      })
      .catch((error) => console.log(error));
  };

  //Download file from database
  // const downloadFile = ({ target }) => {
  //   console.log(target.value);
  //   const url = apiFileUpload + `/` + target.value;
  //   const config = {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //       authorization: `Bearer ${userMem.token}`,
  //     },
  //   };
  //   axios
  //     .get(url, config)
  //     .then((data) => console.log(data))
  //     .catch(({ err }) => console.log(err));
  // };

  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-900 via-blue-800 to-purple-500">
          View Documents
        </h1>
      </div>
      <div className="flex flex-row h-fit mx-4 m-2 p-3 space-x-10 rounded-lg">
        <div
          className="flex flex-col p-4 pb-4 h-fit w-1/3 space-y-2 shadow-lg shadow-slate-500/50 
        bg-stone-200 rounded-lg"
        >
          <h2
            className="flex mx-auto m-1 p-1 px-4 text-xl border border-neutral-500 shadow-lg 
          shadow-gray-600/50 rounded-lg"
          >
            Upload File
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-neutral-600"
          >
            <label htmlFor="file">
              File
              <input
                type="file"
                multiple
                name="file"
                className="flex w-3/4 shadow-inner py-1
                file:py-1 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-gray-100
                hover:file:bg-gray-500 hover:file:scale-95 
                transition-transform duration-700"
                onChange={handleFileSelect}
              />
            </label>

            <button
              className="m-auto px-2 mt-2 border border-gray-700 hover:shadow-lg 
            shadow-gray-600/50 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
        <div
          className="flex flex-col p-4 pb-4 w-2/3 space-y-2 shadow-lg shadow-slate-500/50 
        bg-stone-200 rounded-lg"
        >
          <h2
            className="flex mx-auto m-1 p-1 px-4 text-xl border border-neutral-500 shadow-lg 
          shadow-gray-600/50 rounded-lg"
          >
            Files
          </h2>
          <div className="flex flex-col p-2 text-neutral-600 shadow-inner shadow-neutral-800/50 border border-neutral-600 rounded-lg">
            <h2 className="text-xl mx-auto my-2">AWS Database</h2>

            <div className="flex flex-row relative h-4 w-full justify-start">
              <button
                type="button"
                onClick={toggleFunc}
                className="flex flex-row justify-start mx-4 h-6"
              >
                Select mode
                <input
                  type={`checkbox`}
                  className="toggle ml-4 w-5 h-5"
                  checked={toggleSelect}
                  // readOnly
                  onChange={toggleFunc}
                />
              </button>
              {toggleSelect && (
                <button
                  type="button"
                  onClick={deleteFiles}
                  className="mr-4 p-1 h-fit text-2xl text-red-600 active:text-red-300 
                active:bg-slate-500 bg-slate-300 absolute right-0 rounded-md"
                >
                  <TbTrashX className="" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-6 p-2 py-8 gap-x-2 gap-y-10">
              {fileName?.map(({ filename, _id }) => (
                <div key={_id} className="flex flex-col space-y-1">
                  <a
                    href={`${apiFileDownload}/{"token":"${token}","filename":"${filename}"}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex flex-row relative mx-auto h-10 w-10 bg-neutral-600 active:bg-neutral-500 shadow-md shadow-neutral-800/50 active:shadow-inner active:shadow-neutral-800/50 rounded-lg"
                  >
                    {toggleSelect && (
                      <input
                        id={_id}
                        type={`checkbox`}
                        value={filename}
                        onClick={selectAction}
                        className="toggle absolute h-4 w-4 right-12"
                      />
                    )}
                    <button value={filename} />
                  </a>
                  <h5 className="mx-auto text-center">
                    {/* {filename} */}
                    {filename.length < 30 ? (
                      <a
                        href={`${apiFileDownload}/{"token":"${token}","filename":"${filename}"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {filename}
                      </a>
                    ) : (
                      <a
                        href={`${apiFileUpload}/{"token":"${token}","filename":"${filename}"}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {filename.substring(0, 14) + "..."}
                        <br />
                        {"..." +
                          filename.substring(
                            filename.length - 8,
                            filename.length
                          )}
                      </a>
                    )}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
