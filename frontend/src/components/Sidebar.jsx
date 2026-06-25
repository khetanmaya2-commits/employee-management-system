import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaUsersCog,
} from "react-icons/fa";

import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Sidebar({setIsLoggedIn}) {
const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);

const userName =
  localStorage.getItem("userName") || "Guest";

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");

  setIsLoggedIn(false);
 
  navigate("/login");
}

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FaUsersCog className="sidebar-logo" />

        <div>
          <h2>Employee</h2>
          <p>Management System</p>
        </div>
      </div>

      <NavLink className='links' to='/'>  <FaTachometerAlt />
        <span>Dashboard</span></NavLink>
      <NavLink className='links' to='/employees'> <FaUsers />
        <span>Employees</span></NavLink>
      <NavLink className='links' to='/reports'><FaChartBar />
        <span>Reports</span></NavLink>
      <NavLink className='links' to='/settings'> <FaCog />
        <span>Settings</span></NavLink>

        <div className="sidebar-footer">

  <div className="user-profile">
    <div className="user-avatar">
      {localStorage
        .getItem("userName")
        ?.charAt(0)
        .toUpperCase()}
    </div>

    <div className="user-info">
      <h4>
        {localStorage.getItem("userName")}
      </h4>
      <p>Administrator</p>
    </div>
  </div>

  <button
    className="logout-btn"
    onClick={()=>setShowLogoutModal(true)}
  >
    <FaSignOutAlt />
    Logout
  </button>

</div>

{
  showLogoutModal && (
    <div className="modal-overlay">
      <div className="logout-modal">

        <h3>Logout</h3>

        <p>
          Are you sure you want to logout?
        </p>

        <div className="logout-actions">

          <button
            className="cancel-btn"
            onClick={() =>
              setShowLogoutModal(false)
            }
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}
    </aside>

    
  
);
}

export default Sidebar;