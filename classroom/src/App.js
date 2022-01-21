import SignIn from "./components/userAccount/SignIn";
import { Routes, Route} from "react-router-dom";
import SignUp from "./components/userAccount/SignUp";
import {UserAuthContextProvider} from "./context/UserAuthContext";

function App() {
  return (
    <div>
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
