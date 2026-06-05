import { useNotification } from "../notificationStore";

const Notification = () => {
  const notification = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div style={style}>{notification || "render here notification..."}</div>
  );
};

export default Notification;
