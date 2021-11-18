import React from "react";
import CommentCard from "./commentCard.js";
import Stack from '@mui/material/Stack';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="text-white">No Comments Yet</h3>;
  }

  return (
    <>
      <h3 style={{paddingLeft: '20px', color: 'white'}}>Comments:</h3>
      {/* <div className="flex-row my-4"> */}
      <Stack style={{display: 'flex', direction: 'row'}}>
        {comments &&
          comments.map((comment) => <CommentCard comment={comment} />)}
      </Stack>
    </>
  );
};


export default CommentList;
