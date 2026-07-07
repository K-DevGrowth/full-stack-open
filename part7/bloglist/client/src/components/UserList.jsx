import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLoggedUser } from "../hooks/useLoggedUser";
import { getAllUsers } from "../services/users";
import { Link, useMatch } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const UserList = () => {
  const { users, isPending, isError } = useUsers();

  const math = useMatch("/api/users");

  if (isPending) return "loading...";

  if (isError) return "error";

  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.username}>
                <TableCell>
                  <Link component={Link} to={`/users/${user.id}`}>
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
