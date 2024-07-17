import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const GET_ALL_USERS = gql`
  query GetAllUsers($page: Int!, $limit: Int!) {
    getAllUsers(page: $page, limit: $limit) {
      users {
        user_id
        email_address
        first_name
        last_name
        date_of_birth
        register_date
        telephone_number
        role
        lock_status
      }
      totalCount
    }
  }
`;

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($user_id: Int!, $role: UserRole!) {
    updateUserOperation(input: { user_id: $user_id, role: $role }) {
      user_id
      role
    }
  }
`;

const UserList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 10;

  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS, {
    variables: { page: currentPage, limit },
  });

  const [updateUserRole] = useMutation(UPDATE_USER_ROLE);

  const handleUpdateRole = (user_id, newRole) => {
    updateUserRole({
      variables: {
        user_id,
        role: newRole,
      },
    })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error("Error updating user role:", err);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Register Date</TableCell>
            <TableCell>Telephone Number</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getAllUsers.users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.user_id}</TableCell>
              <TableCell>{user.email_address}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.date_of_birth}</TableCell>
              <TableCell>{user.register_date}</TableCell>
              <TableCell>{user.telephone_number}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button onClick={() => handleUpdateRole(user.user_id, "User")}>
                  Set User
                </Button>
                <Button
                  onClick={() => handleUpdateRole(user.user_id, "Cinema")}
                >
                  Set Cinema
                </Button>
                <Button onClick={() => handleUpdateRole(user.user_id, "Admin")}>
                  Set Admin
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
