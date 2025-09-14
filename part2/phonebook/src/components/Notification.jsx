const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={`notification ${type === "success" ? "" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
