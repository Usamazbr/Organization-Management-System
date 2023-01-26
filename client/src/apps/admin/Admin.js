import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useVer } from "../../context/VerContext";
import { useRolesContext } from "./context/rolesContext";
import { usePartnersContext } from "./context/partnersContext";
import { usePermsContext } from "./context/permissionsContext";

import Loading from "./components/loading.js";

const HomePage = lazy(() => import("./pages/home"));
const EmployeeDataRoute = lazy(() => import("./routes/employeedata"));
const RolesRoute = lazy(() => import("./routes/roleseditroute"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Navbar2 = lazy(() => import("./components/Navbar2"));

const AppRoutes = () => {
  const [enterApp, setEnterApp] = useState(0);
  const { user } = useVer();
  const { dispatch } = useRolesContext();
  const { partnerDispatch } = usePartnersContext();
  const { permDispatch } = usePermsContext();

  // TODO put all the useEffects outside

  useEffect(() => {
    // fetching permissions from server
    const apiServerDataUrl = `http://localhost:5033/api/admin/permissions/data`;
    axios
      .get(apiServerDataUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(
        async ({ data }) =>
          await permDispatch({ type: "DISPLAY", payload: data.permissions })
      )
      .catch((error) => console.log(error));

    // fetching Buckets
    const apiUrl = `http://localhost:5033/api/admin/role/data`;
    axios
      .get(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(async ({ data }) => {
        await dispatch({ type: "DISPLAY", payload: data.data });
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

    // fetching Partners
    const apiUserUrl = `http://localhost:5033/api/user/data/${user._id}`;
    axios
      .get(apiUserUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(async ({ data }) => {
        console.log(data);
        await partnerDispatch({ type: "DISPLAY", payload: data.data });
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
  }, [user, dispatch, partnerDispatch, permDispatch]);

  switch (enterApp) {
    case 1:
      return (
        <div className="flex flex-row m-auto">
          <Sidebar handleState={(e) => setEnterApp(e)} />
          <Suspense fallback={<Loading />}>
            <EmployeeDataRoute />
          </Suspense>
        </div>
      );

    case 2:
      return (
        <div className="flex flex-col m-auto">
          <Navbar2 handleState={(e) => setEnterApp(e)} />
          <Suspense fallback={<Loading />}>
            <RolesRoute />
          </Suspense>
        </div>
      );

    default:
      return (
        <div className="m-auto">
          <HomePage handleState={(e) => setEnterApp(e)} />
        </div>
      );
  }
};

export default AppRoutes;
