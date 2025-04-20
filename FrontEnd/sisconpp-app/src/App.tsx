import { Routes, Route} from "react-router-dom";
import { RoutesPaths } from "./models/enums/RouterPaths";
import Login from "./pages/Login";
import TelaInicial from "./pages/TelaInicial";

function App() {
  
  return (
    <>
    <Routes>
      <Route path={RoutesPaths.Login} element={<Login />}/>
      <Route path={RoutesPaths.TelaInicial} element={<TelaInicial/>}/>
    </Routes>
    </>
  );
}

export default App;