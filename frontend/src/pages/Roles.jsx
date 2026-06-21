import { useEffect, useState } from 'react';

import api from '../api/api';

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState('');

  const fetchRoles = async () => {
    const res = await api.get('/roles');
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const createRole = async () => {
    if (!roleName) return;

    try {
      await api.post('/roles', {
        name: roleName,
      });

      setRoleName('');
      setError('');
      fetchRoles();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create role');
    }
  };

  return (
    <div className="container">
      <h2>Roles Management</h2>

      {error && <p className="error">{error}</p>}

      {/* For new role creation */}
      {/* <div>
        <input
          placeholder="New role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />

        <button onClick={createRole}>Add Role</button>
      </div> */}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}