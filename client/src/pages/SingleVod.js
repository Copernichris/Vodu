import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import VideoPage from "../components/VideoPage";

import { QUERY_SINGLE_VOD } from "../utils/queries";


const SingleVod = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { vodId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_VOD, {
    // pass URL parameter
    variables: { vodId: vodId },
  });

  const vod = data?.vod || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ marginBottom: 100 }}>
        <VideoPage comments={vod.comments} video={vod} />
      </div>
      <div>
        <CommentForm vodId={vod._id} />
      </div>
      <div>
        <CommentList comments={vod.comments} />
      </div>
    </>
  );
};

export default SingleVod;
