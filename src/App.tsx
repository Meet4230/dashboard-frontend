import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DepartmentManagement from "./pages/Department";
import EmployeeProfilePage from "./pages/Employee";
import EmployeeQueriesPage from "./pages/EmployeeQuery";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/employee-queries" element={<EmployeeQueriesPage />} />
        <Route path="/employee-profile" element={<EmployeeProfilePage />} />
        <Route
          path="/department-management"
          element={<DepartmentManagement />}
        />
      </Routes>
    </Router>
  );
};

export default App;
