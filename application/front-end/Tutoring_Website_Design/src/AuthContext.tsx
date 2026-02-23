import { createContext, useState, useEffect, useContext } from "react";

interface ContextType {
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('Token');
    const savedEmail = localStorage.getItem('userEmail');
    if (savedToken) setToken(savedToken);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Login function now also takes email
  const login = (newToken: string, userEmail: string) => {
    localStorage.setItem('Token', newToken);
    localStorage.setItem('userEmail', userEmail);
    setToken(newToken);
    setEmail(userEmail);
    console.log("Logged in:", userEmail, newToken);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('userEmail');
    setToken(null);
    setEmail(null);
  };

  return (
    <Context.Provider value={{ token, email, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) throw new Error("use must be used within Provider");
  return context;
};
