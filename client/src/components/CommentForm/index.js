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
    <> 
      {Auth.loggedIn() ? (
        <div className="form-section justify-center align-center">
        <div className="form-wrapper">
          <h3 className="vod-form-input text-center text-white">
            {" "}
            Add a Comment{" "}
          </h3>
          <form
            className="flex-column justify-center align-center"
            onSubmit={handleFormSubmit}
          >            
            <div className="form-group flex-row align-center justify-center">
              <label className="vod-form-label text-white">Timestamp</label>
              <input
                name="timeStamp"
                type="number"
                min="0"
                value={timeStamp}
                className="vod-form-input w-100 bg-dark text-white"
                style={{ lineHeight: ".5" }}
                onChange={handleTimeChange}
              ></input>
            </div>
            <div className="form-group flex-row align-center justify-center">
              <label className="vod-form-label text-white">Comment</label>
              <textarea
                name="commentText"
                value={commentText}
                className="vod-form-input w-100 bg-dark text-white"
                style={{ lineHeight: "1.25", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
              <p
                className={`m-0 ${
                  characterCount === 280 || error
                    ? "text-danger"
                    : "text-white vod-form-label form-description-label"
                }`}
              >
                Character Count: {characterCount}/280
              </p>
            </div>
            <div className="pt-1justify-center align-center flex-row">
              <button
                className="add-vod-btn bg-primary text-white"
                type="submit"
              >
                Add Vod
              </button>
            </div>
            {error && (
              <div className="my-3 bg-danger text-white p-2">
                <p className="justify-center align-center">
                  Something went wrong!
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
      ) : (
        <p className="comment-login text-white">
          You need to be logged in to comment. <Login />
          or <Signup />
        </p>
      )}
    </>
  );
};

export default CommentForm;