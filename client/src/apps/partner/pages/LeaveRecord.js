import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useVer } from "../../../context/VerContext";

//TODO conjoined leave doesn't show up next month

const Dashboard = () => {
  const { user } = useVer();
  const [leaves, setLeaves] = useState([]);
  const [allYears] = useState(() =>
    [...new Array(100)].map((_, i) => i + 2000)
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [allMonths] = useState(() =>
    [...new Array(12)].map((_, i) => ({
      id: i,
      month: new Date(new Date().getFullYear(), i).toLocaleString("default", {
        month: "long",
      }),
    }))
  );
  const [selectedMonth, setSelectedMonth] = useState(
    allMonths[new Date().getMonth()]
  );

  const [days, setDays] = useState(() => {
    const totalDays = new Date(
      selectedYear,
      new Date().getMonth(),
      0
    ).getDate();
    const monthDays = [...new Array(totalDays)].map((_, i) => {
      const dayofWeek = new Date(
        selectedYear,
        new Date().getMonth(),
        i + 1
      ).getDay();
      return { day: i + 1, weekDay: dayofWeek };
    });

    return monthDays;
  });

  const userToken = useMemo(() => user.token, [user.token]);

  useEffect(() => {
    const apiLeavesRecord = `http://localhost:5033/api/admin/leaves/record`;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userToken}`,
      },
    };

    // uploading to server
    const getLeavesRecord = async () => {
      await axios({ method: "get", url: apiLeavesRecord, ...config })
        .then(({ data }) => {
          // const extLeaves = data.data.filter(({ month }) => {
          //   new Date(new Date().getFullYear);
          // });
          // console.log(extLeaves);
          // setLeaves((prev) => {
          //   return { ...prev, duration: prev.duration + 1 };
          // });
          setLeaves(() => data.data);
          console.log(data.data);
        })
        .catch((error) => console.log(error));
    };
    getLeavesRecord();
  }, [userToken]);

  const MarkFunction = () => {
    let names = leaves.map(({ username, _id }) => {
      const name = username.split(" ")[0];
      const id = _id;
      return { id, name };
    });
    names = [...new Map(names.map((m) => [m.name, m])).values()];

    return (
      <>
        {names.map(({ name, id }) => (
          <tr key={id} className="mx-2">
            <td className="mx-auto px-2 text-center border border-black">
              {name}
            </td>
            {days.map(({ day, weekDay }) => {
              let leaveType;
              let bit = leaves.map(
                ({
                  start,
                  end,
                  typeofLeave,
                  month,
                  year,
                  comment,
                  username,
                }) => {
                  let newEnd = end;
                  if (end < start) {
                    newEnd = new Date(year, month + 1, 0).getDate() + end;
                  }
                  if (
                    selectedYear === year &&
                    selectedMonth.id + 1 === month &&
                    start <= day &&
                    newEnd >= day &&
                    name === username.split(" ")[0] &&
                    weekDay !== 0 &&
                    weekDay !== 6
                  ) {
                    switch (typeofLeave) {
                      case "Annual":
                        leaveType = comment;
                        return `🔵`;
                      case "Casual":
                        leaveType = comment;
                        return `🟡`;
                      case "Sick":
                        leaveType = comment;
                        return `🔴`;

                      default:
                        break;
                    }
                  } else if (weekDay === 0 || weekDay === 6) {
                    return `S`;
                  }
                  return `⚪`;
                }
              );
              bit = bit.filter((b) => b !== `⚪`);

              return (
                <td
                  className={`group relative p-1 text-center shadow-inner ${
                    (weekDay === 6 || weekDay === 0) && `bg-gray-400`
                  } ${
                    day === new Date().getDate() &&
                    new Date().getMonth() === selectedMonth.id &&
                    new Date().getFullYear() === +selectedYear &&
                    `border-green-700 bg-green-500`
                  } shadow-gray-600/60 border border-black`}
                  key={day}
                >
                  <button
                    className={`${
                      bit[0] && `shadow-sm`
                    } h-fit w-fit mx-auto text-white font-bold text-center 
                    hover:shadow-gray-800 active:shadow-none
                    rounded-full`}
                  >
                    {bit[0] ? bit[0] : `⚪`}
                  </button>
                  {/* Tooltip */}
                  <p
                    className={`absolute right-1/3 bottom-10 mx-auto ${
                      bit[0] && `py-1 px-4 border border-gray-400`
                    } text-sm text-gray-100 group-hover:visible invisible ${
                      (weekDay === 6 || weekDay === 0) &&
                      `group-hover:invisible`
                    }
                    transition-opacity shadow-md shadow-gray-800 bg-gray-800 rounded-lg`}
                  >
                    {leaveType}
                  </p>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col rounded-lg">
      <div className="flex flex-row mx-4 m-2 p-3 shadow-lg shadow-slate-500/50 bg-stone-200 rounded-lg">
        <h1 className="mx-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-900 via-blue-800 to-purple-500">
          Leave Record of All Employees
        </h1>
      </div>
      <div className="flex flex-row h-fit mx-4 m-2 p-3 justify-between space-x-10 rounded-lg">
        <div
          className="flex flex-col p-2 px-4 pb-4 w-full space-y-4 shadow-lg 
        shadow-slate-500/50 bg-stone-200 rounded-lg"
        >
          {/* <h2 className="p-2 mx-auto text-xl">Dashboard</h2> */}

          <div
            className="flex flex-row px-2 w-full space-x-2 m-2"
            data-mdb-toggle-button="false"
          >
            <select
              type="date"
              value={selectedYear}
              className="w-1/5 px-3 py-1 text-lg font-bold font-serif bg-gray-600 
              text-gray-300 rounded-lg focus:rounded-b-none"
              onChange={({ target }) => {
                setSelectedYear(+target.value);
                const totalDays = new Date(
                  target.value,
                  selectedMonth.id + 1,
                  0
                ).getDate();
                console.log(+target.value);
                const monthDays = [...new Array(totalDays)].map((_, i) => {
                  const dayofWeek = new Date(
                    target.value,
                    selectedMonth.id,
                    i + 1
                  ).getDay();
                  return { day: i + 1, weekDay: dayofWeek };
                });
                setDays(() => monthDays);
              }}
            >
              {allYears.map((year) => {
                if (year >= selectedYear) {
                  return <option key={year} className="hidden" />;
                }
                return (
                  <option
                    className={`${
                      year === new Date().getFullYear() &&
                      `border border-black rounded-md`
                    }`}
                    key={year}
                  >
                    {year}
                  </option>
                );
              })}
              <option className="font-bold text-blue-400">
                {selectedYear}
              </option>
              {allYears.map((year) => {
                if (year <= selectedYear) {
                  return <option key={year} className="hidden" />;
                }
                return (
                  <option
                    className={`${
                      year === new Date().getFullYear() &&
                      `border border-black rounded-md`
                    }`}
                    key={year}
                  >
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                {/* <th className="w-fit border border-black">January</th> */}
                <th className="bg-gray-600 rounded-tl-lg">
                  <select
                    id="Type"
                    value={selectedMonth.month}
                    className="px-1 w-full bg-gray-600 text-gray-300 rounded-tl-lg"
                    onChange={({ target }) => {
                      const monthObj = allMonths.filter(
                        ({ month }) => month === target.value
                      )[0];
                      setSelectedMonth(monthObj);
                      const totalDays = new Date(
                        selectedYear,
                        monthObj.id + 1,
                        0
                      ).getDate();
                      const monthDays = [...new Array(totalDays)].map(
                        (_, i) => {
                          const dayofWeek = new Date(
                            selectedYear,
                            monthObj.id,
                            i + 1
                          ).getDay();
                          return { day: i + 1, weekDay: dayofWeek };
                        }
                      );
                      setDays(() => monthDays);
                    }}
                  >
                    {allMonths.map(({ month, id }) => {
                      if (id >= selectedMonth.id) {
                        return <option key={id} className="hidden" />;
                      }
                      return (
                        <option
                          className={`${
                            id + 1 === new Date().getMonth && `font-bold`
                          }`}
                          key={id}
                        >
                          {month}
                        </option>
                      );
                    })}
                    <option className="font-bold">{selectedMonth.month}</option>
                    {allMonths.map(({ month, id }) => {
                      if (id <= selectedMonth.id) {
                        return <option key={id} className="hidden" />;
                      }
                      return (
                        <option
                          className={`${
                            id + 1 === new Date().getMonth && `font-bold`
                          }`}
                          key={id}
                        >
                          {month}
                        </option>
                      );
                    })}
                  </select>
                </th>

                {days.map(({ day, weekDay }) => (
                  <th
                    className={`text-gray-300 ${
                      (weekDay === 6 || weekDay === 0) && `bg-gray-900`
                    } ${
                      day === new Date().getDate() &&
                      new Date().getMonth() === selectedMonth.id &&
                      new Date().getFullYear() === +selectedYear &&
                      `shadow-lg shadow-gray-600 border-green-700 bg-green-500 text-red-900`
                    } bg-gray-600 border border-black`}
                    key={day}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <MarkFunction />

              <tr className="mx-2">
                <td className="mx-auto bg-black border border-black">{``}</td>
                {days.map(({ day }) => (
                  <td
                    className="mx-auto bg-black border border-black"
                    key={day}
                  >
                    {``}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* Test button */}
          {/* <button
            type="button"
            onClick={() => console.log(selectedYear)}
            className="active:bg-slate-800 active:text-white mx-auto px-4 rounded-lg"
          >
            test
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
