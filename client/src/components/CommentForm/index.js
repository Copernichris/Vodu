import React, { useState } from "react";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ vodId }) => {
  const [commentText, setCommentText] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  console.log(commentText);
  console.log(timeStamp);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          vodId,
          commentText,
          timeStamp,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
      setTimeStamp("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;

    if (name === "timeStamp") {
      setTimeStamp(value);
    }
  };

  return (
    <div>
      <h4 className="text-white">Create Comment</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 text-white ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="timeStamp"
                placeholder="What time?"
                value={timeStamp}
                className="form-input w-100"
                style={{ lineHeight: "1", resize: "vertical" }}
                onChange={handleTimeChange}
              ></input>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add a comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="comment-login text-white">
          You need to be logged in to comment. <Login />
          or <Signup />
        </p>
      )}
    </div>
  );
};

export default CommentForm;
