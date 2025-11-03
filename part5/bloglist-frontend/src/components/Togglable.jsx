import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleVisible}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisible}>cancle</button>
      </div>
    </div>
  );
};

export default Togglable;
