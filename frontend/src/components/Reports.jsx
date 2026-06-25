import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { FaUsers, FaBuilding, FaUserPlus, FaUserTie } from "react-icons/fa"

function Reports({ employees = [] }) {
    const deptCounts = {};
    const roleCounts = {};

    employees.forEach((emp) => {
        const dept = emp.dept.trim().toLowerCase();
        const role = emp.role.trim().toLowerCase();

        deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    const departmentData = Object.entries(deptCounts).map(([dept, count]) => ({
        dept,
        count,
    }));

    const roleData = Object.entries(roleCounts).map(([role, count]) => ({
        role,
        count,
    }));



    const topDepartment = Object.entries(deptCounts).sort(
        (a, b) => b[1] - a[1]
    )[0];

    const departmentCounts = {};
    const recentEmployees = employees.slice(-5).reverse();

    const activeEmployees = employees.filter(
        (emp) => emp.status === "Active"
    ).length;

    const onLeaveEmployees = employees.filter(
        (emp) => emp.status === "On Leave"
    ).length;

    const inactiveEmployees = employees.filter(
        (emp) => emp.status === "Inactive"
    ).length;

    employees.forEach((emp) => {
        departmentCounts[emp.dept] = (departmentCounts[emp.dept] || 0) + 1;
    });

    const today = new Date();

    const currentDate = today.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );


    const totalEmployees = employees.length;

    const getPercent = (count) =>
        totalEmployees === 0
            ? 0
            : Math.round((count / totalEmployees) * 100);

    return (
        <div className="reports-page">
            <div className="welcome-card">
                <div>
                    <h2>Reports & Analytics</h2>
                    <p>Real-time employee analytics by department and role.</p>
                </div>
                <div className="date-badge">
                    {currentDate}
                </div>
            </div>

            <div className="report-stats">

                <div className="card stat-card">
                    <div>
                        <h4>Total Employees</h4>
                        <p>{employees.length}</p>
                    </div>
                    <div className="icon-box employees-icon">
                        <FaUsers />
                    </div>
                </div>

                <div className="card stat-card">
                    <div>
                        <h4>Departments</h4>
                        <p>{Object.keys(deptCounts).length}</p>
                    </div>
                    <div className="icon-box department-icon">
                        <FaBuilding />
                    </div>
                </div>

                <div className="card stat-card">
                    <div>
                        <h4>Roles</h4>
                        <p>{Object.keys(roleCounts).length}</p>
                    </div>
                    <div className="icon-box role-icon">
                        <FaUserTie />
                    </div>
                </div>
                <div className="card stat-card top-dept">
                    <h4>Top Department</h4>
                    <p>{topDepartment ? topDepartment[0].toUpperCase() : "N/A"}</p>
                    <div className="data">
                        <small>{topDepartment ? `${topDepartment[1]} employees` : "No data"}</small>
                    </div>
                </div>

            </div>

            <div className="dashboard-grid">
                <div className="status-progress-card">
                    <div className="chart-header">
                        <div>
                            <h3>Employee Status</h3>
                            <p>Status-wise employee overview</p>
                        </div>
                    </div>

                    <div className="status-progress-list">
                        <div className="status-progress-item">
                            <div className="status-progress-top">
                                <span>Active</span>
                                <strong>{activeEmployees}</strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill active-fill"
                                    style={{ width: `${getPercent(activeEmployees)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="status-progress-item">
                            <div className="status-progress-top">
                                <span>On Leave</span>
                                <strong>{onLeaveEmployees}</strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill leave-fill"
                                    style={{ width: `${getPercent(onLeaveEmployees)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="status-progress-item">
                            <div className="status-progress-top">
                                <span>Inactive</span>
                                <strong>{inactiveEmployees}</strong>
                            </div>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill inactive-fill"
                                    style={{ width: `${getPercent(inactiveEmployees)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-box">
                    <h3>Recent Employees</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>

                            </tr>
                        </thead>
                        <tbody>
                            {recentEmployees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.dept}</td>
                                    <td>{emp.role}</td>
                                    <td><span className={`status-badge ${emp.status === "On Leave" ? "on-leave" : emp.status.toLowerCase()}`}>
                                        {emp.status}</span>
                                    </td>
                                    <td>{emp.joiningDate}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default Reports;