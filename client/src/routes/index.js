import { lazy } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useVer } from "../context/VerContext";
import { PartnersContextWrap } from "../apps/admin/context/partnersContext";
import { RolesContextWrap } from "../apps/admin/context/rolesContext";
import { PermsContextWrap } from "../apps/admin/context/permissionsContext";
import { AllowedPermsContextWrap } from "../apps/partner/context/permissionsContext";
import { RolesContextWrap2 } from "../apps/partner/context/rolesContext";
import { PartnersContextWrap2 } from "../apps/partner/context/partnersContext";
import Signup from "../pages/Signup";

const AdminApp = lazy(() => import("../apps/admin/Admin"));
const PartnerApp = lazy(() => import("../apps/partner/Partner"));
const EmployeeApp = lazy(() => import("../apps/employee/Employee"));
const LoginPage = lazy(() => import("../pages/Login"));

const AppRoutes = () => {
  const { user } = useVer();
  return (
    <div className="m-auto pages">
      <Routes>
        <Route path="/" element={<Navigate to="/login/*" />} />
        <Route
          path="/login/*"
          element={!user ? <LoginPage /> : <Navigate to="/admin/*" />}
        />
        <Route
          path="/signup/*"
          element={!user ? <Signup /> : <Navigate to="/admin/*" />}
        />
        <Route
          path="/admin/*"
          element={
            user ? (
              <>
                {
                  {
                    1: (
                      <RolesContextWrap>
                        <PartnersContextWrap>
                          <PermsContextWrap>
                            <AdminApp />
                          </PermsContextWrap>
                        </PartnersContextWrap>
                      </RolesContextWrap>
                    ),
                    2: <Navigate to="/partner/*" />,
                    3: <Navigate to="/employee/*" />,
                  }[user.admin]
                }
              </>
            ) : (
              <Navigate to="/login/*" />
            )
          }
        />
        <Route
          path="/partner/*"
          element={
            user ? (
              <AllowedPermsContextWrap>
                <RolesContextWrap2>
                  <PartnersContextWrap2>
                    <PartnerApp />
                  </PartnersContextWrap2>
                </RolesContextWrap2>
              </AllowedPermsContextWrap>
            ) : (
              <Navigate to="/login/*" />
            )
          }
        />
        <Route
          path="/employee/*"
          element={user ? <EmployeeApp /> : <Navigate to="/login/*" />}
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
