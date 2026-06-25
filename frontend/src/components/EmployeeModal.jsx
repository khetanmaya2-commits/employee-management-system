import React from 'react'

function EmployeeModal({ employee, closeModal }) {
    if (!employee) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Employee Detail</h2>
                    <button className='close-icon' onClick={closeModal}> x</button>
                </div>
                <div className="modal-body">
                    <div className="employee-avatar">
                        {String(employee.name || "E").charAt(0).toUpperCase()}
                    </div>
                    <div className="detail-row">
                        <span>Name</span>
                        <strong>{employee.name}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Email</span>
                        <strong>{employee.email}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Role</span>
                        <strong>{employee.role}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Department</span>
                        <strong>{employee.dept}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Joining Date</span>
                        <strong>{employee.joiningDate}</strong>
                    </div>
                    <div className="detail-row ">
                        <span>Status</span>

                        <span
                            className={`modal-status ${employee.status === "On Leave"
                                    ? "on-leave"
                                    : employee.status.toLowerCase()
                                }`}
                        >
                            {employee.status}
                        </span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="close-btn" onClick={closeModal}>
                        Close
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EmployeeModal