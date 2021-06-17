import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    margin: "auto 0",
    width: "70%",
    height: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 6),
  },
  modal: {
    margin: "auto",
    width: "50%",
    padding: "1rem",
  },
  modal_input: {
    display: "flex-col",
  },
  input: {
    margin: "1rem 0 0 0",
    width: "60%",
  },
}));

const Form = ({ open, handleClose, handleSubmit, currentUser }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const updateUser = { ...currentUser, ...user };
    handleSubmit(updateUser);
    handleClose();
    setUser({
      first_name: "",
      last_name: "",
      email: "",
    });
  };

  const body = (
    <form
      onSubmit={handleSubmitButton}
      className={classes.paper}
      autoComplete="off"
    >
      <div className={classes.modal_input}>
        <TextField
          className={classes.input}
          required
          onChange={handleChange}
          id="first_name"
          name="first_name"
          label="Nombre"
          variant="outlined"
          value={user.first_name}
        />
        <TextField
          className={classes.input}
          required
          onChange={handleChange}
          id="last_name"
          name="last_name"
          label="Apellido"
          variant="outlined"
          value={user.last_name}
        />
        <TextField
          className={classes.input}
          required
          onChange={handleChange}
          type="mail"
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={user.email}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.input}
          value="Submit"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      {body}
    </Modal>
  );
};

export default Form;
