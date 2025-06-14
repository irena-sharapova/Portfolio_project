import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import '../CSS/Navbar.css';


function MyNavbar() {
    return (
        <Navbar expand="lg" className="mb-4 shadow-sm custom-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-name">
                    Irina Sharapova
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto gap-4">
                        <Nav.Link as={Link} to="/">Overview</Nav.Link>
                        <Nav.Link as={Link} to="/aboutme">About Me</Nav.Link>
                        <Nav.Link as={Link} to="/people">People</Nav.Link>
                        <Nav.Link as={Link} to="/nature">Nature</Nav.Link>
                        <Nav.Link as={Link} to="/things">Things</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    <Nav.Link
                        href="https://www.instagram.com/irena_sharapova/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-icon"
                        aria-label="Instagram"
                    >
                        <FaInstagram size={24} color="#333" />
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default MyNavbar;