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
import VodList from "../VodList/index";

const ProfileRightSideContent = () => {
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
    <Card sx={{ marginTop: "35px", marginRight: "95px", backgroundColor: "#3e34a0", color: "white",}}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="h2">
          {Auth.getProfile().data.username}'s Vod List
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <div className="col-12 col-md-10 mb-5">
            <VodList
              vods={user.vods}
              title={`${user.username}'s vods...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileRightSideContent;
