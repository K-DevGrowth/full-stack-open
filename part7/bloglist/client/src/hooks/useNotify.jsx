import { Children, createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleLikeNotify = (blogObject) => {
    setMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} was liked`,
    );
    setMessageType("success");
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleAddNotify = (blogObject) => {
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`);
    setMessageType("success");
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
        handleLikeNotify,
        handleAddNotify,
        handleRemoveNotify,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
