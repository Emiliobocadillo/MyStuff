import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  const login = (email: string, token: string) => {
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
