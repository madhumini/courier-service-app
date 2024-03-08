const Nav: React.FC = () => {
  
  return (
    <nav className="navbar navbar-expand-lg d-flex bg-color ">
      <div className="container">
        <a className="navbar-brand" href="#">
          SpeedyCourier Solutions
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse me-lg-2"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link" href="/admin_dashboard">
              Shipments
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
