import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <button className="header-buttons text-white pr-3" onClick={handleOpen}>
        Login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="Login form"
      >
        <Box sx={style}>
          <h1 className="bg-black text-white p-3 text-center">Login</h1>
          <div>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="EMAIL"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="PASSWORD"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block text-white bg-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="btn btn-block text-white mt-1 bg-link"
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                >
                  Close
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 bg-danger text-white p-2">
                <p className="justify-center align-center">
                  Something went wrong!
                </p>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
