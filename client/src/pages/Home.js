import React from "react";
import { useQuery } from "@apollo/client";

import VodList from "../components/VodList";
import VodForm from "../components/VodForm";

import { QUERY_VODS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_VODS);
  const vods = data?.vods || [];

  return (
    <>
      <VodForm />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <VodList vods={vods} title="Popular Vods" />
      )}
    </>
  );
};

export default Home;
