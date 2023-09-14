import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutBtn';

function BasicExample() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      navigate('/');
    }
  };
  return (

    <Navbar fixed='top' expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><NavLink to="/">Home</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/instructors">All Instructors</NavLink>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink> 
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item> 
                
                </NavDropdown.Item>
              <NavDropdown.Item>
              <LogoutButton onLogout={handleLogout} />
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



    // this is okay gotta style the logout button but with some regular css should be good

    // gonna try and make the drop down a resort list component












    // <Nav
    //   activeKey="/">
    //   <Nav.Item>
    //     <NavLink to="/">Active</NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <NavLink to="/instructors">All Instructors</NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //   <NavLink to="/login">Log in</NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //   <NavLink to="/signup">Sign up</NavLink>
    //   </Nav.Item>
    //   <Nav.Item>
    //   <LogoutButton onLogout={handleLogout} />
    //   </Nav.Item>
    // </Nav>
  );
}

export default BasicExample