import {
  // useState,
  useEffect,
  lazy,
  // Suspense
} from "react";
// import NavbarPartner from "../admin/components/NavbarPartner";
import axios from "axios";
import { useVer } from "../../context/VerContext";
import { useRolesContext } from "./context/rolesContext";
import { usePartnersContext } from "./context/partnersContext";
import { useAllowedPermsContext } from "./context/permissionsContext";

// import Loading from "./components/loading.js";

const PartnerAppRoute = lazy(() => import("./routes"));
const NavbarPartner = lazy(() => import("./components/NavbarPartner"));

const PartnerApp = () => {
  //   const [enterApp, setEnterApp] = useState(0);
  const { dispatch } = useRolesContext();
  const { partnerDispatch } = usePartnersContext();
  const { user } = useVer();
  const { allowedPermDispatch } = useAllowedPermsContext();

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
      .then(async ({ data }) => {
        // user.permissions.map((id) => console.log(JSON.stringify(id)));
        const allowed = data.permissions.filter(({ id }) =>
          user.permissions.map((_id) => JSON.stringify(_id)).includes(id)
        );
        // console.log(allowed);
        await allowedPermDispatch({ type: "DISPLAY", payload: allowed });
      })
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
        console.log(data.data);
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
    const apiUserUrl = `http://localhost:5033/api/user/data/${user.admin_id}`;
    axios
      .get(apiUserUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(
        async ({ data }) =>
          await partnerDispatch({ type: "DISPLAY", payload: data.data })
      )
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

    return () => {};
  }, [user, partnerDispatch, dispatch, allowedPermDispatch]);

  return (
    <div className="m-auto">
      <NavbarPartner />
      <PartnerAppRoute />
    </div>
  );
};

export default PartnerApp;
