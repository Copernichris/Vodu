import React, { useState, useEffect } from 'react';
import CommentList from './index.js';
import { useMutation } from '@apollo/client';
import { ADD_VOTES } from '../../utils/mutations';

const CommentCard = ({ comment }) => {
    const [count, setCount] = useState(0);
    const [addVotes, { error }] = useMutation(ADD_VOTES);

    useEffect(() => { }, [count])
    
    const updateCount = async () => {
        setCount(count + 1)
        await addVotes({
            variables: { 
                vodId: comment._id,
                voteCount: count,
            }
        })
    }
    
    return (
        <div key={comment._id} className="flex-row col-12 mb-3 pb-3">
            {/* Adding upvote system. Still in progress. Need to add counter function*/}
            <div className="pt-2">
                {/* Use onClick={} for function */}
                <button className="upvote mb-0"
                    name="upVote"
                    value={count}
                    onClick={() => updateCount()}>
                ^
                </button>
                <h5 className="mb-0 pb-1 pt-1 text-white">
                {count}
                </h5>
                <button className="downvote" onClick={() => setCount(count - 1)}>
                v
                </button>
            </div>
            {/* End of Upvote changes */}
            <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                {comment.commentAuthor} commented{' '}
                <span style={{ fontSize: '0.825rem' }}>
                    at {comment.timeStamp}
                </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
            </div>
        </div>
    );
};


export default CommentCard;
