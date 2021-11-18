import React from "react";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Auth from "../../utils/auth";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Avatar from "@mui/material/Avatar";

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
    <Card sx={{maxWidth: 900, padding: 0, marginLeft: "135px", marginTop: "35px", backgroundColor: "#3e34a0", color: "white", align: "center"}}>
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
        </Typography>
        <Typography variant="body2" color="white" component="p">
          This Card's children are wrapped in a CardContent component, which
          adds 16px of padding around the edges. The last CardContent in a group
          of children will get 24px of padding on the bottom.
        </Typography>
      </CardContent>
    </Card>
  );
};

  

export default ProfileLeftSideContent;