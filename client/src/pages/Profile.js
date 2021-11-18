import React from "react";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCardLeft from "../components/ProfileCard/CardContent";
import ProfileCardRight from "../components/ProfileCard/VideoCardContent";

const Profile = () => {
  //Dark Theme
  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <main className="flex-row justify-center align-center">
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <ProfileCardLeft />
        </Grid>

        {/* this section controls the right side of the profile page. (Vods & Vod uploads) */}
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <ProfileCardRight />
        </Grid>
      </Grid>
    </main>
  );
};

export default Profile;
