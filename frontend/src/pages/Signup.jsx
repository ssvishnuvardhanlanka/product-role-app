import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api/api';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}