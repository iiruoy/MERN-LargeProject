import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';          

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      try { setUser(jwtDecode(t)); }
      catch { localStorage.removeItem('token'); }
    }
  }, []);

  function login(u, token) {
    localStorage.setItem('token', token);
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}