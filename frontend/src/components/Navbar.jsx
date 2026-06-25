function Navbar() {

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
    <nav className="navbar">
      <div>
        <h1>Employee Form</h1>
      </div>
      
         <div className="date-badge">
    {currentDate}
  </div>
      
    </nav>
  );
}

export default Navbar;