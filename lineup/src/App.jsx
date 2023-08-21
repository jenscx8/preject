// create a reusable nav component

// login button

// route to home page

// logout button
import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import BasicExample from '../components/NavBar';
import LogoutButton from '../components/LogoutBtn';

export default function Nav() {
//   const navigate = useNavigate();

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('/api/logout');
//     if (res.data.success) {
//       navigate('/');
//     }
//   };
  return (
    <>
    <BasicExample/>
      {/* <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/instructors">All Instructors</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
          <li>
            <NavLink to="/me">Your Profile</NavLink>
          </li>
          <li>
            <LogoutButton onLogout={handleLogout} />
          </li>
        </ul>
      </nav> */}

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}