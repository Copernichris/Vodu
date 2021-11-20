import React from "react";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Auth from "../../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Avatar from "@mui/material/Avatar";
import EditProfile from "../../pages/EditProfile";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

const ProfileLeftSideContent = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <main className="flex-row justify-center align-center">
        <div className="col-8">
          <div className="card">
            <h4 className="text-center p-3 mb-2 mt-2">
              You need to be logged in to see this. Use the navigation links
              above to login or signup!
            </h4>
          </div>
        </div>
      </main>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 900,
        padding: 0,
        marginLeft: "135px",
        marginTop: "35px",
        backgroundColor: "#3e34a0",
        color: "white",
        align: "center",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {Auth.getProfile().data.username}'s profile
          <Avatar
            sx={{ width: 100, height: 100, align: "center" }}
            onClick={() => {
              console.log("clickable Avatar!");
            }}
            src="https://res.cloudinary.com/retro-game-stop/image/upload/v1632282525/ynyjdyopetpzzkrkik6y.png"
          ></Avatar>
          <EditProfile />
        </Typography>
        <Typography variant="body2" color="white" component="p">
          {user.name}
          {user.favGame}
          {user.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileLeftSideContent;
