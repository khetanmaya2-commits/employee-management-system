function Settings({ theme, setTheme }) {

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


  return (
    <div className="settings-page">
      <div className="welcome-card">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Real-time employee analytics by department and role.</p>
        </div>
        <div className="date-badge">
          {currentDate}
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Admin Profile</h3>

          <div className="profile-avatar">M</div>

          <label>Name</label>
          <input type="text" value="Maya Khetan" readOnly />

          <label>Email</label>
          <input type="email" value="admin@ems.com" readOnly />

          <label>Role</label>
          <input type="text" value="HR Admin" readOnly />
        </div>

        <div className="settings-card">
          <h3>App Preferences</h3>

          <div className="theme-card">

            <div className="theme-info">
              <h4>Dark Mode</h4>
              <p>
                Switch between light and dark theme.
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() =>
                  setTheme(
                    theme === "light"
                      ? "dark"
                      : "light"
                  )
                }
              />

              <span className="slider"></span>
            </label>

          </div>

          <label>Default Department</label>
          <select>
            <option>IT</option>
            <option>HR</option>
            <option>Sales</option>
            <option>Marketing</option>
          </select>

          <label>Employees Per Page</label>
          <select>
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>

          <button className="save-btn">Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;