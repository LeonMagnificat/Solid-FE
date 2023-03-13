import "./App.css";
import Landing from "./components/landing/Landing.jsx";
import { Routes, Route } from "react-router-dom";
import Account from "./components/account/Account.jsx";
import Group from "./components/groupPage/GroupPage.jsx";
import LoginbyInvitation from "./components/login/LoginbyInvitation.jsx";
import RegisterbyInvitation from "./components/register/RegisterbyInvitation";
import GetStarted from "./components/getStarted/GetStarted.jsx";
import GetStarted02 from "./components/getStarted/GetStarted02.jsx";
import GetStarted03 from "./components/getStarted/GetStarted03.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/:id/:email" element={<LoginbyInvitation />} />
        <Route path="/register/:id/:email" element={<RegisterbyInvitation />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/getstarted02" element={<GetStarted02 />} />
        <Route path="/getstarted03" element={<GetStarted03 />} />
        <Route path="/home" element={<Account />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;
