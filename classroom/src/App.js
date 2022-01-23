import LogIn from "./components/userAccount/LogIn";
import { Routes, Route} from "react-router-dom";
import SignUp from "./components/userAccount/SignUp";
import {UserAuthContextProvider, useUserAuth} from "./context/UserAuthContext";
import Home from "./Home";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const ctx = useUserAuth();
  return (
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/home" element = {<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      </Routes>
      </UserAuthContextProvider>
  );
}

export default App;
