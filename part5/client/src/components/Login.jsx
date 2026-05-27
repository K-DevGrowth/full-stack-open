import { useState } from "react";
import { Button, TextField } from "@mui/material";

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
            <TextField
              variant="standard"
              label="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="standard"
              label="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" type="submit">
            login
          </Button>
        </form>
      </div>
    );
  };

  return <div style={{ margin: "0 40px" }}>{!user && loginFrom()}</div>;
};

export default Login;
