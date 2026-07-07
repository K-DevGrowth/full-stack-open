import { createContext, useContext, useEffect, useState } from "react";
import { setToken } from "../services/blogs";
import { useNavigate } from "react-router-dom";
import { login } from "../services/login";
import { useNotify } from "./useNotify";
import { getUser, removeUser, saveUser } from "../services/persistentUser";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { notifyLoginUser } = useNotify();

  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = getUser();
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await login({ username, password });

      saveUser(user);
      setUser(user);
      setToken(user.token);

      notifyLoginUser({ success: true });

      navigate("/");
    } catch (error) {
      notifyLoginUser({ success: false });
    }
  };

  const handleLogout = () => {
    removeUser();
    setUser(null);
    setToken(null);

    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLoggedUser = () => useContext(UserContext);
