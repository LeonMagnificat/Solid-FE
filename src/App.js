import "./App.css";
import Landing from "./components/landing/Landing.jsx";
import { Routes, Route } from "react-router-dom";
import Account from "./components/account/Account.jsx";
import Group from "./components/groupPage/GroupPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Account />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;
