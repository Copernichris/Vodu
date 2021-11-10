import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import VodForm from '../components/VodForm';
import VodList from '../components/VodList';

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <main className="flex-row justify-center align-center">
        <div className="col-8">
          <div className="card">
            <h4 className="text-center p-3 mb-2 mt-2">
              You need to be logged in to see this. Use the navigation links
              above to login or signup!
            </h4>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-row justify-center align-center">
      <div className="col-md-8">
        <div className="card">
          <h2 className="card-header bg-black text-center text-white p-3 mb-2">
            {Auth.getProfile().data.username}'s profile
          </h2>


        <div className="col-12 col-md-10 mb-5">
          <VodList
            vods={user.vods}
            title={`${user.username}'s vods...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <VodForm />

            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
