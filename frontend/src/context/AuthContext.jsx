import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const savedUser = localStorage.getItem('user');

  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const loginUser = (data) => {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const hasRole = (...roles) => {
    return user?.roles?.some((role) => roles.includes(role));
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}