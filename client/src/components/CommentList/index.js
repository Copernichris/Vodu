import React from "react";
import CommentCard from "./commentCard.js";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="text-white">No Comments Yet</h3>;
  }

  return (
    <>
      <h3 className="text-white">Comments</h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => <CommentCard comment={comment} />)}
      </div>
    </>
  );
};

export default CommentList;
