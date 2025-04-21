import { Routes, Route } from "react-router-dom";
import { RoutesPaths } from "./models/enums/RouterPaths";
import Login from "./pages/Login";
import TelaInicial from "./pages/TelaInicial";
import RT from "./pages/RT";
import CTG from "./pages/CTG";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Routes>
        <Route path={RoutesPaths.Login} element={<Login />} />
        <Route path={RoutesPaths.TelaInicial} element={<TelaInicial />} />
        <Route path={RoutesPaths.RT} element={<RT />} />
        <Route path={RoutesPaths.CTG} element={<CTG />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;