import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // load user khi reload
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (username, password) => {
    // fake login
    if (!username || !password) return false;

    const fakeUser = { username };
    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const loginAsGuest = () => {
    const guestUser = { username: "Guest" };
    setUser(guestUser);
    localStorage.setItem("user", JSON.stringify(guestUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);