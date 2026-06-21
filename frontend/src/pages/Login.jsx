import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', form);
      loginUser(res.data);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        No account? <Link to="/signup">Signup</Link>
      </p>

      {/* <p>
        Default admin: <b>admin / admin123</b>
      </p> */}
    </div>
  );
}