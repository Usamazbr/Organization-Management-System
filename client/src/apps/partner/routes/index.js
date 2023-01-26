import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/home"));
const LeavePolicy = lazy(() => import("../pages/LeavePolicy"));
const Onboarding = lazy(() => import("../pages/Onboarding"));
const ViewDocuments = lazy(() => import("../pages/ViewDocuments"));
const HierarchyEdit = lazy(() => import("../pages/HierarchyEdit"));
const SendRequest = lazy(() => import("../pages/SendRequest"));
const SendEmail = lazy(() => import("../pages/SendEmail"));
const SendNotification = lazy(() => import("../pages/SendNotification"));
const SendLeaveRequest = lazy(() => import("../pages/SendLeaveRequest"));
const ViewRoaster = lazy(() => import("../pages/ViewRoaster"));
const LeaveRecord = lazy(() => import("../pages/LeaveRecord"));
const Settings = lazy(() => import("../pages/Settings"));

const PartnerApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/permission_id=1" element={<LeavePolicy />} />
        <Route path="/permission_id=2" element={<Onboarding />} />
        <Route path="/permission_id=3" element={<ViewDocuments />} />
        <Route path="/permission_id=4" element={<HierarchyEdit />} />
        <Route path="/permission_id=5" element={<HierarchyEdit />} />
        <Route path="/permission_id=6" element={<SendRequest />} />
        <Route path="/permission_id=7" element={<SendEmail />} />
        <Route path="/permission_id=8" element={<SendNotification />} />
        <Route path="/permission_id=9" element={<SendLeaveRequest />} />
        <Route path="/permission_id=10" element={<ViewRoaster />} />
        <Route path="/permission_id=12" element={<LeaveRecord />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default PartnerApp;
