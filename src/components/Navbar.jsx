import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import "../CSS/Navbar.css";
import logo from "../assets/logo_picture_clear.png";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="mb-4 shadow-sm custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "65px", width: "auto" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex flex-column flex-lg-row gap-4 align-items-start align-items-lg-center">
            {/* <Nav className="ms-auto d-flex gap-4 align-items-center"> */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              People
            </NavLink>
            <NavLink
              to="/things"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Things
            </NavLink>
            <NavLink
              to="/nature"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Nature
            </NavLink>
            <NavLink
              to="/aboutme"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Me
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contact
            </NavLink>
            <a
              href="https://www.instagram.com/irena_sharapova/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-icon nav-link"
              aria-label="Instagram"
            >
              <FaInstagram size={24} color="#333" />
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
