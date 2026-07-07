import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const notifyLikeBlog = ({ success, blog }) => {
    setMessageType(success ? "success" : "error");

    setMessage(
      success
        ? `A blog ${blog.title} by ${blog.author} was liked`
        : "Failed to like blog",
    );
  };

  const notifyAddBlog = ({ success, blog }) => {
    setMessageType(success ? "success" : "error");

    setMessage(
      success
        ? `A blog ${blog.title} by ${blog.author} added`
        : "Failed to add blog",
    );
  };

  const notifyRemoveBlog = ({ success, blog }) => {
    setMessageType(success ? "success" : "error");

    setMessage(
      success
        ? `A blog ${blog.title} by ${blog.author} was removed`
        : "Failed to remove blog",
    );
  };

  const notifyLoginUser = ({ success }) => {
    setMessageType(success ? "success" : "error");

    setMessage(
      success ? "logged in successfully" : "wrong username or password",
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        message,
        messageType,
        notifyAddBlog,
        notifyRemoveBlog,
        notifyLikeBlog,
        notifyLoginUser,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
