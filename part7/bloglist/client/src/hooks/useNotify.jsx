import { Children, createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const notifyLikeBlog = (blog) => {
    setMessage(`a new blog ${blog.title} by ${blog.author} was liked`);
    setMessageType("success");
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const notifyAddBlog = ({ success, blog }) => {
    setMessage(
      success
        ? `a new blog ${blog.title} by ${blog.author} added`
        : "Failed to add blog",
    );

    setMessageType(success ? "success" : "error");

    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleRemoveNotify = (blogToRemove) => {
    setMessageType("success");
    setMessage(
      `a blog ${blogToRemove.title} by ${blogToRemove.author} was removed`,
    );
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        message,
        messageType,
        notifyAddBlog,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
