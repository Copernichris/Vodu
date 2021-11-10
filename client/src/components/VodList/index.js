import React from 'react';
import { Link } from 'react-router-dom';

const VodList = ({
  vods,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!vods.length) {
    return <h3>No Vods</h3>;
  }

  return (    
    <div>
      {showTitle && <h3>{title}</h3>}
      {vods &&
        vods.map((vod) => (
          <div key={vod._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${vod.vodAuthor}`}
                >
                  {vod.vodAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    placeholder {vod.vodUrl}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You placeholder {vod.vodUrl}
                  </span>
                </>
              )}
            </h4>

            <div className="card-body bg-light p-2">
              <p>{vod.vodUrl}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/vods/${vod._id}`}
            >
              Watch This Vod
            </Link>
          </div>
        ))}
    </div>
  );
};

export default VodList;
