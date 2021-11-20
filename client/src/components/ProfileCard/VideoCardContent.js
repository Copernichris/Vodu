import React from "react";
// import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Auth from "../../utils/auth";
import { Redirect, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import VodList from "../VodList/index";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ProfileRightSideContent = ({
  vods,
  title,
  showTitle = true,
  showUsername = true,
}) => {
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
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Card
      sx={{
        marginTop: "35px",
        marginRight: "95px",
        backgroundColor: "#3e34a0",
        color: "white",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{ display: "flex", justifyContent: "center", align: "center" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {Auth.getProfile().data.username}'s Vod List
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <div className="col-12 col-md-10 mb-5">
            <VodList
              vods={user.vods}
              title={`${user.username}'s vods...`}
              showTitle={true}
              showUsername={true}
            />
          </div>
        </Typography>

        <Typography
          sx={{ display: "flex", justifyContent: "center", align: "center" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          All Vods Listed
        </Typography>

        <ThemeProvider theme={darkTheme}>
          <Container sx={{ py: 8 }}>
            <Grid container spacing={4}>
              {vods &&
                vods.map((vod) => (
                  <Grid item key={vod._id} xs={24}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Link
                            className="purple-links"
                            to={`/vods/${vod._id}`}
                          >
                            {vod.vodTitle} <br></br>
                          </Link>
                          {showUsername ? (
                            <Link
                              className="purple-links"
                              to={`/profiles/${vod.vodAuthor}`}
                            >
                              <span style={{ fontSize: "1rem" }}>
                                {vod.vodAuthor}
                              </span>
                            </Link>
                          ) : (
                            <>
                              <span style={{ fontSize: "1rem" }}>
                                {vod.vodAuthor}
                              </span>
                            </>
                          )}
                        </Typography>
                      </CardContent>
                      <CardContent
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            // 16:9
                            // pt: '56.25%',
                            height: "auto",
                            width: "30vw",
                          }}
                          src={
                            "https://img.youtube.com/vi/" +
                            vod.vodUrl.split("?v=").pop().split("&t").shift() +
                            "/maxresdefault.jpg"
                          }
                          alt="titlegoeshere!"
                        />
                        <Typography sx={{ px: 3 }}>
                          {vod.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </ThemeProvider>
      </CardContent>
    </Card>
  );
};

export default ProfileRightSideContent;
