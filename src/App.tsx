import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./app/routerUtils/PrivateRoute";
import Dashboard from "./app/components/dashboard/Dashboard";
import Login from "./app/components/login/Login";
import "./App.css";
import Navbar from "./app/components/navbar/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* the PrivateRoute restrict the Routes to work just if the user is logged in*/}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/*" element={<Navigate replace to="/dashboard" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
