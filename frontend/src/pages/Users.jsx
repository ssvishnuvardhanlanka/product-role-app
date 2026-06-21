import { useEffect, useState } from 'react';

import api from '../api/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchData = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      api.get('/users'),
      api.get('/roles'),
    ]);

    setUsers(usersRes.data);
    setRoles(rolesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleRole = async (user, roleId) => {
    const existingRoleIds = user.roles.map((role) => role.id);

    const newRoleIds = existingRoleIds.includes(roleId)
      ? existingRoleIds.filter((id) => id !== roleId)
      : [...existingRoleIds, roleId];

    await api.patch(`/users/${user.id}/roles`, {
      roleIds: newRoleIds,
    });

    fetchData();
  };

  return (
    <div className="container">
      <h2>Users Management</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Roles</th>
            <th>Assign Roles</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>

              <td>
                {user.roles.map((role) => role.name).join(', ')}
              </td>

              <td>
                {roles.map((role) => (
                  <label key={role.id} style={{ marginRight: 12 }}>
                    <input
                      type="checkbox"
                      checked={user.roles.some((r) => r.id === role.id)}
                      onChange={() => toggleRole(user, role.id)}
                    />
                    {role.name}
                  </label>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}