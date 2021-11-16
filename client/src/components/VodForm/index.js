import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_VOD } from "../../utils/mutations";
import { QUERY_VODS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const VodForm = () => {
  const [vodUrl, setVodUrl] = useState("");

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
        },
      });

      setVodUrl("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "vodUrl" && value.length <= 280) {
      setVodUrl(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9 ">
              <textarea
                name="vodUrl"
                placeholder="Vod url..."
                value={vodUrl}
                className="form-input w-100 bg-dark text-white"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Vod
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p className="text-white">Please login or signup to get started.</p>
      )}
    </div>
  );
};

export default VodForm;
