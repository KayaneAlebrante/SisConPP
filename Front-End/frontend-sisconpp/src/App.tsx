import { Routes, Route} from "react-router-dom";
import { RoutesPaths } from "./models/enums/routePaths";
import Login from "./pages/Login";

function App() {
  
  return (
    <>
    <Routes>
      <Route path={RoutesPaths.Login} element={<Login />}/>
    </Routes>
    </>
  );
}

export default App;
