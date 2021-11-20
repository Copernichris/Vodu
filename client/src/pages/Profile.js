import React from "react";
import Grid from "@mui/material/Grid";
import ProfileCardLeft from "../components/ProfileCard/CardContent";
import ProfileCardRight from "../components/ProfileCard/VideoCardContent";
import { QUERY_VODS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_VODS);
  const vods = data?.vods || [];

  return (
    <div className="flex-row justify-center align-center">
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <ProfileCardLeft />
        </Grid>

        {/* this section controls the right side of the profile page. (Vods & Vod uploads) */}
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <ProfileCardRight vods={vods} title="Popular Vods" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
