import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_VOD } from "../../utils/mutations";
import { QUERY_VODS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const VodForm = () => {
  const [vodUrl, setVodUrl] = useState("");
  const [vodTitle, setVodTitle] = useState("");
  const [description, setDescription] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addVod, { error }] = useMutation(ADD_VOD, {
    update(cache, { data: { addVod } }) {
      try {
        const { vods } = cache.readQuery({ query: QUERY_VODS });

        cache.writeQuery({
          query: QUERY_VODS,
          data: { vods: [addVod, ...vods] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, vods: [...me.vods, addVod] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addVod({
        variables: {
          vodUrl,
          vodAuthor: Auth.getProfile().data.username,
          vodTitle,
          description,
        },
      });

      setVodTitle("");
      setDescription("");
      setVodUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "vodUrl") {
      setVodUrl(value);
    }
  };

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;

    if (name === "description" && value.length <= 280) {
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === "vodTitle") {
      setVodTitle(value);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="form-section justify-center align-center">
          <div className="form-wrapper">
            <h3 className="vod-form-input text-center text-white">
              {" "}
              Add a Vod{" "}
            </h3>
            <form
              className="flex-column justify-center align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="form-group flex-row align-center justify-center">
                <label className="vod-form-label text-white">VOD URL</label>
                <input
                  name="vodUrl"
                  value={vodUrl}
                  className="vod-form-input w-100 bg-dark text-white"
                  style={{ lineHeight: ".5" }}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group flex-row align-center justify-center">
                <label className="vod-form-label text-white">Title</label>
                <input
                  name="vodTitle"
                  value={vodTitle}
                  className="vod-form-input w-100 bg-dark text-white"
                  style={{ lineHeight: ".5" }}
                  onChange={handleTitleChange}
                ></input>
              </div>
              <div className="form-group flex-row align-center justify-center">
                <label className="vod-form-label text-white">Description</label>
                <textarea
                  name="description"
                  value={description}
                  className="vod-form-input w-100 bg-dark text-white"
                  style={{ lineHeight: "1.25", resize: "vertical" }}
                  onChange={handleDescriptionChange}
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
        <p className="text-white">Please login or signup to get started.</p>
      )}
    </>
  );
};

export default VodForm;
