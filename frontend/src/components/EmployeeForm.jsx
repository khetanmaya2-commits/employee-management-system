function EmployeeForm({ name, role, email, dept,joiningDate, 
  setEmail, setDept, setName, setRole, setJoiningDate,
   addEmployee, status, setStatus }) {
    
  return (
    <section className="form-card">
      <input
        placeholder="Employee Name" required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Employee Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />


      <input
        placeholder="Employee Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        type="email"
        placeholder="Employee Department" required
        value={dept}
        onChange={(e) => setDept(e.target.value)}
      />
      <input
        type="date"
        
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button onClick={addEmployee}>Add Employee</button>


    </section>
  );
}

export default EmployeeForm;