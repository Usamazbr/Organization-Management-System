import { useState } from "react";
import { useVer } from "../context/VerContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");
  const [err, setErr] = useState(null);
  const [loadState, setLoadState] = useState(null);
  const { dispatch } = useVer();

  const apiUrl = `http://localhost:5033/api/user/signup`;

  const signup = async (e) => {
    e.preventDefault();
    setLoadState(true);
    setErr(null);

    // TODO add axios

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        organization: org,
        admin: 1,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      setLoadState(false);
      setErr(json.err);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      const startTime = new Date().getTime();
      localStorage.setItem("time", JSON.stringify(startTime));

      dispatch({ type: "LOGIN", payload: json });

      setLoadState(false);
    }
  };

  return (
    <div className="flex flex-row mx-4 mr-8 h-150 rounded-md">
      <div className="w-3/4"></div>
      <form
        className="flex flex-col w-1/4 m-auto p-5 bg-blue-400 text-slate-900 
        shadow-lg shadow-slate-500/50 rounded-lg"
        onSubmit={signup}
      >
        <h3 className="m-2 text-xl font-bold text-slate-900">Signup</h3>

        <label className="mt-4 px-2">Username:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-400 rounded-md"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label className="mt-4 px-2">Email address:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-400 rounded-md"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="mt-4 px-2">Password:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-400 rounded-md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label className="mt-4 px-2">Organization:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-400 rounded-md"
          type="text"
          onChange={(e) => setOrg(e.target.value)}
          value={org}
        />

        <button
          className="m-auto mt-2 p-2 hover:bg-slate-900 hover:text-blue-400 rounded-lg"
          disabled={loadState}
        >
          Signup
        </button>
        {err && (
          <div className="error mx-auto mt-1 p-1 px-2 text-red-700 border border-red-700 rounded-xl">
            {err}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
