import { useState } from "react";

const Login = ({ user, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  const loginFrom = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  return <div>{!user && loginFrom()}</div>;
};

export default Login;
