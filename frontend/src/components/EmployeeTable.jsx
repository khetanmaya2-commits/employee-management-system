function EmployeeTable({ employees, deleteEmployee,
  updateEmployee, search, setSearch, deptFilter, setDeptFilter,
  roleFilter, setRoleFilter, setSelectedEmployee ,exportEmployeesCSV,status, setStatus,
statusFilter, setStatusFilter}) {

  
  return (
    <section className="table-card">
      <div className="table-header">
        <div className="filters">
          <input
            className="search-input"
            placeholder="Search by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >

            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>

           <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >

            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
            
          </select>
        </div>
         <button className="export-btn" onClick={exportEmployeesCSV}>
  Export CSV
</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
            <th>Status</th>
            <th>Joining Date</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.email}</td>
              <td>{emp.dept}</td>
              
              <td>
                <div className="action-buttons">
                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>


                  <button className="update-btn" onClick={() => updateEmployee(emp)}>
                    Update
                  </button>

                  <button className="view-btn" onClick={() => setSelectedEmployee(emp)}>View</button>
                </div>
              </td>
              <td><span className={`status-badge ${
                  emp.status === "On Leave" ? "on-leave" : emp.status.toLowerCase()}`}>
                {emp.status}</span>
                </td>
                <td>{emp.joiningDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EmployeeTable;