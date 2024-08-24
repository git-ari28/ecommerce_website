import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    try {
      const data = localStorage.getItem('auth');
      if (data) {
        const parseData = JSON.parse(data);
        setAuth({
          user: parseData.user,
          token: parseData.token,  // Corrected typo here
        });
      }
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
