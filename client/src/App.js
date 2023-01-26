import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { VerContextWrap } from "./context/VerContext";
import Loading from "./components/loading";
import NavBar from "./components/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <VerContextWrap>
          <NavBar />
          <AppRoutes />
        </VerContextWrap>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
