import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState("");

  const displayVoteNotification = (content) => {
    setNotification(`anecdote '${content}' voted`);
    setTimeout(() => setNotification(""), 5000);
  };

  const displayAddNotification = (content) => {
    setNotification(
      `${content ? `anecdote '${content}' added` : "too short anecdote, must have length 5 or more"}`,
    );
    setTimeout(() => setNotification(""), 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, displayVoteNotification, displayAddNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
