import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLoggedUser } from "../hooks/useLoggedUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);

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
                  <Link component={Link} to="/users/:id">
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

export default Users;
