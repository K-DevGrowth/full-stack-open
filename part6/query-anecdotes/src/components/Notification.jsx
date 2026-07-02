import useNotify from "../hooks/useNotify";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const { notification } = useNotify();

  return <div style={style}>{notification}</div>;
};

export default Notification;
