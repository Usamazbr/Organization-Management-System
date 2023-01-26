import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useVer } from "../../../context/VerContext";

const Dashboard = () => {
  const { user, dispatch } = useVer();
  const [err, setErr] = useState(null);
  const [effect, setEffect] = useState(false);
  const commentRef = useRef("");
  const apiServerDataUrl = useRef(
    "http://localhost:5033/api/admin/leaves/data"
  );
  const [interrupt, setInterrupt] = useState(false);
  const [allowedLeaves, setAllowedLeaves] = useState([]);
  const [dashData, setDashData] = useState({
    annual: [user.leavedata.annual[0], user.leavedata.annual[1]],
    casual: [user.leavedata.casual[0], user.leavedata.casual[1]],
    sick: [user.leavedata.sick[0], user.leavedata.sick[1]],
  });

  const [inputObj, setInputObj] = useState({
    user_id: user._id,
    username: user.username,
    duration: 0,
    typeofLeave: "",
    start: 0,
    end: 30,
    month: 0,
    comment: "",
  });

  useEffect(() => {
    // fetching leaves from server
    const fetchData = async () => {
      const { data } = await axios
        .get(apiServerDataUrl.current, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            authorization: `Bearer ${user.token}`,
          },
        })
        // .then(({ data }) => {
        //   setAllowedLeaves(data);
        //   console.log(data);
        // })
        .catch((error) => console.log(error.response.data.err));
      setAllowedLeaves(data);
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const apiUrl = `http://localhost:5033/api/admin/leaves/request`;

    const data = inputObj;
    console.log(data);
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
        // await partnerDispatch({ type: "CREATE", payload: data });
        console.log(data);

        //local Storage manipulation
        let storeData = localStorage.getItem("user");
        let tempUser = JSON.parse(storeData);
        tempUser.leavedata = data.dashData;
        localStorage.setItem("user", JSON.stringify(tempUser));
        dispatch({ type: "LOGIN", payload: tempUser });

        setDashData(data.dashData);

        // console.log(data.dashData);
        // setDashData()
        e.target.reset();
        setInputObj({
          user_id: user._id,
          username: user.username,
          duration: 0,
          typeofLeave: "",
          start: 0,
          end: 30,
          month: 0,
          comment: "",
        });
        setInterrupt(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setErr(error.response.data.error);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
        console.log(`Error :`, error.message);
        // console.log(error);
      });

    console.log(inputObj);
  };

  const onSelectType = ({ target: { value } }) => {
    let typeofLeave = value;
    if (value !== "select") {
      setInputObj((prev) => ({ ...prev, typeofLeave }));
      console.log(value);
    } else {
      typeofLeave = "";
      setInputObj((prev) => ({ ...prev, typeofLeave }));
    }
    console.log({ ...inputObj, typeofLeave });
  };

  const onSelectStart = ({ target: { value } }) => {
    console.log("Start function called");
    const ValueArr = value.split("-");
    const start = +ValueArr[2];
    const month = +ValueArr[1];
    const year = +ValueArr[0];
    // weekendRemover(ValueArr)
    let duration = inputObj.end - start + 1;
    if (duration > 0) {
      if (!interrupt) {
        duration = 1;
      }

      if (inputObj.end !== 30) {
        setInterrupt(true);
      }

      setInputObj((prev) => ({
        ...prev,
        start,
        month,
        year,
        duration,
      }));
      console.log({ ...inputObj, start, month, year, duration });
      setErr("");
    } else {
      console.log(`Error: Negative`);
      setErr("Duration is in negative");
    }
  };

  const onSelectEnd = ({ target: { value } }) => {
    console.log("End function called");
    const ValueArr = value.split("-");
    const end = +ValueArr[2];
    let duration = 1;

    if (interrupt) {
      console.log(interrupt);
      duration = weekendRemover(ValueArr);
    }
    if (inputObj.start) {
      setInterrupt(true);
    }

    if (duration > 0) {
      setInputObj((prev) => ({ ...prev, duration, end }));
      console.log({ ...inputObj, duration, end });
      setErr("");
    } else {
      console.log(`Error: Negative`);
      setErr("Duration is in negative");
    }
  };

  function weekendRemover(ValueArr) {
    const year = +ValueArr[0];
    let month = +ValueArr[1];
    const end = +ValueArr[2];
    let diff = 0;
    diff = month - inputObj.month;
    let totalDays = [];
    if (diff < 0) return 0;

    totalDays = [...new Array(diff)].map((_, i) =>
      new Date(year, inputObj.month + i, 0).getDate()
    );
    let durationWithWeekends = end - inputObj.start;
    if (durationWithWeekends < 0) return 0;
    console.log(totalDays);
    let newEnd = 0;
    if (diff) {
      do {
        newEnd = totalDays[diff - 1] + newEnd;
        durationWithWeekends = end + newEnd - inputObj.start;
        diff--;
      } while (diff);
    }
    durationWithWeekends++;
    console.log(durationWithWeekends);
    let weekDay = new Date(year, inputObj.month - 1, inputObj.start).getDay();
    const durationMinusWeekends = [...new Array(durationWithWeekends)].filter(
      (_, i) => {
        if (i) {
          weekDay++;
        }
        if (weekDay > 6) {
          weekDay = 0;
        }
        if (weekDay === 0 || weekDay === 6) return false;

        return true;
      }
    );

    return durationMinusWeekends.length;
  }

  const IndlLeavesDashboard = () => {
    return (
      <div className="flex flex-col p-2 pb-4 w-5/12 space-y-4 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h2 className="p-2 mx-auto text-xl">Leaves Dashboard</h2>
        <div className="flex flex-col p-1 border border-stone-400 rounded-md">
          <table>
            <thead>
              <tr>
                <th className="w-1/4">Balance</th>
                <th className="w-1/4">Used</th>
                <th className="w-1/4">Available</th>
                <th className="w-1/4">Allowance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mx-2">
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">{`Annual :`}</p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.annual[0]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.annual[1]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-4 shadow-lg text-center bg-slate-200 border border-stone-400 rounded-md">
                    {allowedLeaves[0]?.amount}
                  </p>
                </td>
              </tr>
              <tr className="mx-2">
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">{`Casual :`}</p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.casual[0]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.casual[1]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-4 shadow-lg text-center bg-slate-200 border border-stone-400 rounded-md">
                    {allowedLeaves[1]?.amount}
                  </p>
                </td>
              </tr>
              <tr className="mx-2">
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">{`Sick :`}</p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.sick[0]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-auto text-center bg-slate-200 rounded-md">
                    {dashData.sick[1]}
                  </p>
                </td>
                <td className="px-2">
                  <p className="mx-4 shadow-lg text-center bg-slate-200 border border-stone-400 rounded-md">
                    {allowedLeaves[2]?.amount}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const onChangeComment = () => {
    let comment = commentRef.current.value;
    setInputObj((prev) => ({ ...prev, comment }));
  };

  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg rounded-t">
        <h1 className="mx-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-900 via-blue-800 to-purple-500">
          Send Leave Request
        </h1>
      </div>
      <div className="flex flex-row h-fit mx-4 m-2 p-3 justify-between space-x-10 rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-5 pb-4 w-4/12 space-y-4 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg"
        >
          <h2 className="p-2 mx-auto text-2xl font-semibold">
            Apply for new leave
          </h2>
          <label className="flex flex-row justify-around">
            Type of leave:
            <select
              id="Type"
              className="m-1 px-1 w-32 bg-gray-600 text-gray-300 rounded-lg"
              onChange={onSelectType}
            >
              <option>select</option>
              <option>Annual</option>
              <option>Casual</option>
              <option>Sick</option>
            </select>
          </label>
          <div className="flex items-center justify-center">
            <div
              className="flex flex-row w-full space-x-2 m-2"
              data-mdb-toggle-button="false"
            >
              <input
                type="date"
                className="form-control block w-full px-3 py-1.5 text-base font-normal 
                bg-gray-600 text-gray-300 bg-clip-padding border border-solid 
                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date"
                onChange={onSelectStart}
              />
              <input
                type="date"
                className="form-control block w-full px-3 py-1.5 text-base font-normal 
                bg-gray-600 text-gray-300 bg-clip-padding border border-solid 
                border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date"
                onChange={onSelectEnd}
              />
            </div>
          </div>
          <label className="flex flex-row justify-around">
            Comments:
            <textarea
              ref={commentRef}
              onChange={onChangeComment}
              type="text"
              placeholder="e.g. surfing 🏄🏽"
              className="mx-1 py-1 px-2 w-full h-14 bg-gray-600 text-gray-300 
              placeholder:italic placeholder:text-yellow-600 hover:shadow-lg 
              shadow-gray-600/50 rounded-md rounded-br-none"
            />
          </label>
          {inputObj.duration !== 0 && (
            <div className="flex flex-col">
              <p className="mx-auto">{`Duration : ${inputObj.duration}`}</p>
            </div>
          )}
          <button
            // type="button"
            onClick={() => setEffect(true)}
            onAnimationEnd={() => setEffect(false)}
            className={`${
              effect && "animate-wiggle"
            } py-1 w-full bg-gray-500 text-gray-100 border hover:bg-gray-300 
            hover:text-gray-600 hover:border-gray-500 rounded-md`}
          >
            Submit
          </button>
          {err && (
            <div className="mt-1 mx-auto px-2 border border-red-700 text-red-700 rounded-xl">
              {`Error: ${err}`}
            </div>
          )}
        </form>
        <IndlLeavesDashboard />
        <div className="flex flex-col p-2 pb-4 w-3/12 space-y-4 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
          <h2 className="p-2 mx-auto text-xl">Who is off today</h2>
          <h3 className="flex flex-row justify-around">Lorel impsum</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
