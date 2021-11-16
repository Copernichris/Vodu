import React, { useState, useEffect } from 'react';
import CommentList from './index.js';
import Button from '@material-ui/core/Button';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const CommentCard = ({ comment }) => {
    const [count, setCount] = useState(0);
    
    return (
        <div key={comment._id} style={
            {
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center', 
                paddingTop: '10px',
                width: '100vw',
            }}>
            {/* Adding upvote system. Still in progress. Need to add counter function*/}
            {/* Mui design for upvotes */}
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                <Button variant='contained' color="primary" size="small" className="upvote" onClick={() => setCount(count + 1)}>
                    <ThumbUpAltIcon />
                </Button>
                <h5 style={{marginBottom: '0px', padding: '1px 0px 1px 0px', color: '#99AAB5'}}>
                {count}
                </h5>
                <Button 
                    variant='contained' 
                    color="primary" 
                    size="small" 
                    className="downvote" 
                    onClick={() => setCount(count - 1)}
                >
                    <ThumbDownAltIcon />
                </Button>
            </Stack>
            {/* End of Upvote changes */}
            <div style={{paddingLeft: '20px', paddingBottom: '20px', color: 'white', backgroundColor: '#5865F2', borderRadius: '5px', width: '80%'}}>
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
