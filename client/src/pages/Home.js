import React from 'react';
import { useQuery } from '@apollo/client';

import VodList from '../components/VodList';
import VodForm from '../components/VodForm';

import { QUERY_VODS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_VODS);
  const vods = data?.vods || [];

  return (
    <main>
      <div className="flex-row justify-center">      
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >          
          <VodForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <VodList
              vods={vods}
              title="Popular Vods"
            />
          )}
        </div>
      </div>
      </main>
  );
};
//thought array state
export default Home;
