import { useState } from "react";
import axios from "axios";
import { useVer } from "../context/VerContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loadState, setLoadState] = useState(null);
  const { dispatch } = useVer();

  const apiUrl = `http://localhost:5033/api/user/login`;

  const login = async (email, password) => {
    setLoadState(true);
    setErr(null);

    const data = { email, password };

    // sending request
    await axios
      .post(apiUrl, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        const startTime = new Date().getTime();
        localStorage.setItem("time", JSON.stringify(startTime));

        dispatch({ type: "LOGIN", payload: data });
        setLoadState(false);
        setErr(null);
      })
      .catch(({ response, message }) => {
        setLoadState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex flex-row mx-4 mr-8 h-150 rounded-md">
      <div className="w-3/4 rounded-md"></div>
      <form
        className="flex flex-col w-1/4 m-auto p-5 bg-gradient-to-b from-blue-900 to-purple-900 text-slate-300 
        shadow-lg shadow-slate-500/50 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="m-2 text-xl font-bold text-slate-300">Log In</h3>

        <label className="mt-4 px-2">Email address:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="mt-4 px-2">Password:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className="m-auto mt-2 p-2 hover:bg-slate-400 hover:text-blue-900 
          active:scale-90 duration-500 rounded-xl"
          disabled={loadState}
        >
          Log in
        </button>
        {err && (
          <div
            className="error mx-auto mt-1 p-1 px-2 text-red-400 border 
          border-red-400 rounded-xl"
          >
            {err}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
