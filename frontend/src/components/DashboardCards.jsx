import { FaUsers, FaBuilding, FaUserTie } from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


function DashboardCards({ employees }) {
  const deptCounts = {};
  const roleCounts = {};

  employees.forEach((emp) => {
    const dept = emp.dept.trim().toLowerCase();
    const role = emp.role.trim().toLowerCase();

    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });

  const totalEmployees = employees.length;

  const totalRoles =
    new Set(
      employees.map((emp) => emp.role.trim().toLowerCase())
    ).size;

  const totalDepts =
    new Set(
      employees.map((emp) => emp.dept.trim().toLowerCase())
    ).size;

  const departmentData = Object.entries(deptCounts).map(([dept, count]) => ({
    dept,
    count,
  }));

  const roleData = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count,
  }));

  const BAR_COLORS = [
    "#2563eb", // blue
    "#22c55e", // green
    "#f97316", // orange
    "#ef4444", // red
    "#8b5cf6", // purple
    "#06b6d4", // cyan
  ]

  const ROLE_COLORS = [
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyJoinData = months.map((month) => ({
    month,
    employees: 0,
  }));

  employees.forEach((emp) => {
    if (!emp.joiningDate) return;

    const monthIndex = new Date(emp.joiningDate).getMonth();

    monthlyJoinData[monthIndex].employees += 1;
  });
  const renderPieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;

    const x =
      cx + radius * Math.cos(-midAngle * RADIAN);

    const y =
      cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight={700}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

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

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const employeeHealth =
    totalEmployees === 0
      ? 0
      : Math.round(
        (activeEmployees / totalEmployees) * 100
      );


  return (
    <div className="dashboard-page">
      <div className="welcome-card">
        <div>
          <h2>Welcome Back</h2>
          <p>Employee Dashboard</p>
        </div>
        <div className="date-badge">
          {currentDate}
        </div>
      </div>

      <div className="cards">
        <div className="card stat-card card-blue">
          <div className="dashboard-card ">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div className="icon-box employees-icon">
            <FaUsers />
          </div>

        </div>

        <div className="card stat-card card-green">
          <div className="dashboard-card ">
            <h3>Departments</h3>
            <p>{totalDepts}</p>
          </div>
          <div className="icon-box department-icon">
            <FaBuilding />
          </div>
        </div>

        <div className="card stat-card card-orange">
          <div className="dashboard-card ">
            <h3>Roles</h3>
            <p>{totalRoles}</p>
          </div>
          <div className="icon-box role-icon">
            <FaUserTie />
          </div>
        </div>

        <div className="card stat-card health-card">
          <div className="dashboard-card card-purple">
            <h3>Employee Health</h3>

            <div className="mini-gauge">
              <div
                className="mini-gauge-fill"
                style={{
                  background: `conic-gradient(
            #22c55e ${employeeHealth * 3.6}deg,
            #e5e7eb 0deg
          )`,
                }}
              >
                <div className="mini-gauge-inner">
                  {employeeHealth}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-grid">

        <div className="chart-card donut-card">
          <div className="chart-header">
            <div>
              <h3>Employees by Role</h3>
              <p>Role-wise employee distribution</p>
            </div>
          </div>

          <div className="donut-layout">
            <div className="donut-chart">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="count"
                    nameKey="role"
                    innerRadius={75}
                    outerRadius={115}
                    paddingAngle={3}
                    label={renderPieLabel}
                    labelLine={false}
                  >
                    {roleData.map((entry, index) => (
                      <Cell
                        key={`role-${index}`}
                        fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="custom-legend">
              {roleData.map((item, index) => (
                <div className="legend-row" key={item.role}>
                  <div className="legend-left">
                    <span
                      className="legend-dot"
                      style={{
                        backgroundColor:
                          ROLE_COLORS[index % ROLE_COLORS.length],
                      }}
                    ></span>

                    <span className="legend-name">
                      {item.role.toUpperCase()}
                    </span>
                  </div>

                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="chart-card area-chart-card">
          <div className="chart-header">
            <div>
              <h3>Employees Joined by Month</h3>
              <p>Monthly employee joining trend</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={monthlyJoinData}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient
                  id="joinGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip cursor={false} />

              <Area
                type="monotone"
                dataKey="employees"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#joinGradient)"
                dot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#ffffff",
                  stroke: "#2563eb",
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Employees by Department</h3>
              <p>Department-wise employee count</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={departmentData}
              barSize={45}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 20,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="dept"
                tick={{
                  fill: "#363a41",
                  fontSize: 16,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#474d56",
                  fontSize: 16,
                }}
                axisLine={false}
                tickLine={false}


              />

              <Tooltip cursor={false} />

              <Bar
                dataKey="count"
                // radius={[10, 10, 0, 0]}
                label={{
                  position: "top",
                  fill: "#444b54",
                  fontSize: 14,
                }}

              >
                {departmentData.map((entry, index) => (
                  <Cell
                    key={`dept-${index}`}
                    fill={
                      BAR_COLORS[
                      index % BAR_COLORS.length
                      ]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>



      </div>

    </div>
  );

}

export default DashboardCards;