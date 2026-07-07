import { useMatch, useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const User = () => {
  const { users, isPending, isError } = useUsers();

  const navigate = useNavigate();

  const math = useMatch("/users/:id");

  if (isPending) return "loading...";

  if (isError) return "error";

  const user = math ? users.find((user) => user.id === math.params.id) : null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>added blogs</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
