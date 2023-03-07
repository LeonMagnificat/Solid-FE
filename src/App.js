import "./App.css";
import Landing from "./components/landing/Landing.jsx";
import { Routes, Route } from "react-router-dom";
import Account from "./components/account/Account.jsx";
import Group from "./components/groupPage/GroupPage.jsx";
import LoginbyInvitation from "./components/login/LoginbyInvitation.jsx";
import RegisterbyInvitation from "./components/register/RegisterbyInvitation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/:id" element={<LoginbyInvitation />} />
        <Route path="/register/:id" element={<RegisterbyInvitation />} />
        <Route path="/home" element={<Account />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;
