import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
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
    <Nav
      activeKey="/">
      <Nav.Item>
        <NavLink to="/">Active</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/instructors">All Instructors</NavLink>
      </Nav.Item>
      <Nav.Item>
      <NavLink to="/login">Log in</NavLink>
      </Nav.Item>
      <Nav.Item>
      <NavLink to="/signup">Sign up</NavLink>
      </Nav.Item>
      <Nav.Item>
      <LogoutButton onLogout={handleLogout} />
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;