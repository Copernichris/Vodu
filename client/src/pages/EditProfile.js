import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@material-ui/core/Button";

const EditProfile = (props) => {
  const [formState, setFormState] = useState({
    bio: "",
    favGame: "",
    name: "",
  });

  // create new mutation for editUser
  const [editUser, { error, data }] = useMutation(EDIT_USER);

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
      // change login to editUser
      const { data } = await editUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      favGame: "",
      age: "",
      name: "",
      bio: "",
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
      <Button onClick={handleOpen}>
        <SettingsIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="Edit-profile"
      >
        <Box sx={style}>
          <h1 className="bg-black text-white p-3 text-center">Edit Profile</h1>
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
                  placeholder="Name"
                  name="name"
                  type="name"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Favorite Game"
                  name="favGame"
                  type="input"
                  value={formState.favGame}
                  onChange={handleChange}
                />
                <textarea
                  className="form-input"
                  placeholder="About you"
                  name="bio"
                  type="input"
                  value={formState.bio}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block text-white bg-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Save
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

export default EditProfile;
