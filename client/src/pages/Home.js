import React from "react";
import { useQuery } from "@apollo/client";
import VodList from "../components/VodList";
import { QUERY_VODS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_VODS);
  const vods = data?.vods || [];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <VodList vods={vods} title="Popular Vods" />
      )}
    </>
  );
};

export default Home;
