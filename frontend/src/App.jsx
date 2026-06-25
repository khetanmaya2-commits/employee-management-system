import { useState, useEffect } from 'react'
import axios from "axios";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import './App.css'
import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import EmployeeTable from './components/EmployeeTable';
import Navbar from './components/Navbar';
import EmployeeModal from './components/EmployeeModal.jsx';
import Reports from './components/Reports.jsx';
import Settings from './components/Settings.jsx';
import Login from './components/Login.jsx'

function App() {

  const API = import.meta.env.VITE_API_URL;

  const [employees, setEmployees] = useState([])
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("")
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
   );
  const employeesPerPage = 5;

  const [joiningDate, setJoiningDate] = useState("");


  function fetchEmployees() {
    axios.get(`${API}/employees`)
      .then((response) => setEmployees(response.data));
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme]);

  function addEmployee() {
    const newEmployee = {
      id: Math.floor(Math.random() * 100000),
      name: name,
      role: role,
      email: email,
      dept: dept,
      status: status,
      joiningDate:joiningDate,
    };
    if (name === "") {
      alert("Enter employee name");
      return;
    }
    axios.post(`${API}/employees`, newEmployee)
      .then(() => {
        fetchEmployees();
        setName("");
        setRole("");
        setEmail("");
        setDept("");
        setSearch("");
        setStatus("Active");
        setJoiningDate("");
      });
  }

  function deleteEmployee(id) {
    axios.delete(`${API}/employees/${id}`)
      .then(() => fetchEmployees());
  }

  function updateEmployee(emp) {
    const newName = prompt("Enter updated Name:", emp.name);
    const newRole = prompt("Enter updated Role:", emp.role);
    const newEmail = prompt("Enter updated Email:", emp.email);
    const newDept = prompt("Enter updated Department:", emp.dept);
    const newStatus = prompt("Enter updated Status:", emp.status)

    const updatedEmployee = {
      name: newName || emp.name,
      role: newRole || emp.role,
      email: newEmail || emp.email,
      dept: newDept || emp.dept,
      status: newStatus || emp.status,
    };

    axios.put(
      `${API}/employees/${emp.id}`,
  updatedEmployee
    )
      .then(() => {
        fetchEmployees();
      });
  }


  function handleLogin(e) {
    e.preventDefault();

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", email.split("@")[0]);

    setIsLoggedIn(true);

    navigate("/");
  }
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.dept.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.status.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = deptFilter === "" || emp.dept.toLowerCase() === deptFilter.toLowerCase();
    const matchesRole = roleFilter === "" || emp.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "" || emp.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;

  })

   useEffect(() => {
    setCurrentPage(1);
  }, [search, deptFilter, roleFilter]);


  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / employeesPerPage)
  );

  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

 
  function exportEmployeesCSV() {
    const headers = ["Name", "Email", "Role", "Department", "Status","Joining Date"];

    const rows = employees.map((emp) => [
      emp.name,
      emp.email,
      emp.role,
      emp.dept,
      emp.status,
      emp.joiningDate,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employees.csv";
    link.click();
  }

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };


  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: isLoggedIn ? (
          <Navigate to="/" replace />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        ),
      },
      {
        path: '/',
        element:
          <ProtectedRoute>
            <div className={`app ${theme}`}>
              <Sidebar setIsLoggedIn={setIsLoggedIn} />
              <div className="main">
                <DashboardCards employees={employees} />
              </div>

            </div>
          </ProtectedRoute>
      },
      {
        path: '/employees',
        element: 
          <div className={`app ${theme}`}>
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
            <div className="main">
              <Navbar />
              <EmployeeForm name={name} role={role}
                email={email} dept={dept} joiningDate={joiningDate}
                setName={setName} setRole={setRole}
                setEmail={setEmail} setDept={setDept}
                addEmployee={addEmployee}
                status={status}
                setStatus={setStatus}
                setJoiningDate={setJoiningDate} />

              <EmployeeTable employees={currentEmployees}
                deleteEmployee={deleteEmployee}
                updateEmployee={updateEmployee}
                search={search}
                setSearch={setSearch}
                deptFilter={deptFilter}
                setDeptFilter={setDeptFilter}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                setSelectedEmployee={setSelectedEmployee}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                exportEmployeesCSV={exportEmployeesCSV}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter} />

              <EmployeeModal employee={selectedEmployee}
                closeModal={() => setSelectedEmployee(null)} />

              <div className="pagination-top">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages || filteredEmployees.length === 0}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      
      },
      {
        path: '/reports',
        element: <ProtectedRoute>
          <div className={`app ${theme}`}>
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
            <div className="main">
              <Reports employees={employees} />
            </div>

          </div>
        </ProtectedRoute>
      },
      {
        path: '/settings',
        element: <ProtectedRoute>
          <div className={`app ${theme}`}>
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
            <div className="main">
              <Settings employees={employees}
                theme={theme}
                setTheme={setTheme} />
            </div>

          </div>
        </ProtectedRoute>
      },
      {
        path: "*",
        element: isLoggedIn
          ? <Navigate to="/" />
          : <Navigate to="/login" />
      }
    ]
  )



  return (
    <>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  )
}

export default App
