import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import Form from "../form/Form.component";

const useStyles = makeStyles({
  avatar: {
    borderRadius: "50%",
    height: "6rem",
    width: "6rem",
  },
  no_avatar: {
    borderRadius: "50%",
    height: "6rem",
    width: "6rem",
    margin: "auto ",
    backgroundColor: "#ABBFFF",
  },
  table: {
    margin: "1rem ",
  },
});

const CustomTable = ({ headers }) => {
  const apiUrl = "https://reqres.in/api/users";
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const actions = { UPDATE: "Modificar", DELETE: "Borrar", ADD: "Agregar +" };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };

  const handleUpdate = (user) => {
    setUpdate(true);
    setCurrentUser(user);
    handleOpen();
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}?page=2`);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (user) => {
    try {
      const { data } = await axios.put(`${apiUrl}/${user.id}`, user);
      const updatedUsers = users.filter((user) => user.id !== data.id);
      setUsers([data, ...updatedUsers]);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (user) => {
    try {
      const { data } = await axios.post(`${apiUrl}`, user);
      setUsers([data, ...users]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { status } = await axios.delete(`${apiUrl}/${userId}`);
      if (status === 204) setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, [users]);
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((title) => (
                <TableCell key={title} align="center">
                  <Typography variant="h5">{title}</Typography>
                </TableCell>
              ))}
              <TableCell align="center">
                <Button onClick={handleOpen} variant="outlined" color="primary">
                  <Typography>{actions.ADD}</Typography>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell key={user.avatar} align="center">
                  {user.avatar ? (
                    <img
                      alt={user.id}
                      className={classes.avatar}
                      src={user.avatar}
                    />
                  ) : (
                    <div className={classes.no_avatar} />
                  )}
                </TableCell>
                <TableCell key={user.id} align="center">
                  <Typography>{user.id}</Typography>
                </TableCell>
                <TableCell key={user.first_name} align="center">
                  <Typography>{user.first_name}</Typography>
                </TableCell>
                <TableCell key={user.last_name} align="center">
                  <Typography>{user.last_name}</Typography>
                </TableCell>
                <TableCell key={user.email} align="center">
                  <Typography>{user.email}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleUpdate(user)}
                    variant="contained"
                    color="primary"
                  >
                    <Typography>{actions.UPDATE}</Typography>
                  </Button>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    variant="contained"
                    color="secondary"
                  >
                    <Typography>{actions.DELETE}</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Form
        open={open}
        handleClose={handleClose}
        handleSubmit={!update ? addUser : updateUser}
        currentUser={update ? currentUser : null}
      />
    </>
  );
};

export default CustomTable;
