import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Navbar Brand */}
          <a className="navbar-brand" href="#">FASHION WEAR</a>
          
          {/* Navbar Toggler for mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"> {/* ms-auto for right-alignment */}
              {/* Home Link */}
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
              </li>
              {/* Shop Link */}
              <li className="nav-item">
                <Link to="/shop" className="nav-link">Shop</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
