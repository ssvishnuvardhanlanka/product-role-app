import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, hasRole, logoutUser } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/products">Products</Link>

      {hasRole('ADMIN') && (
        <>
          <Link to="/users">Users</Link>
          <Link to="/roles">Roles</Link>
        </>
      )}

      <span style={{ marginLeft: 'auto' }}>
        {user.username} — {user.roles.join(', ')}
      </span>

      <button onClick={logoutUser}>Logout</button>
    </nav>
  );
}