import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Stack from '@mui/material/Stack';


const CommentCard = ({ comment }) => {
    const [count, setCount] = useState(0);
    // const [addVotes, { error }] = useMutation(ADD_VOTES);

    // useEffect(() => { }, [count])
    
    // const updateCount = async () => {
    //     setCount(count + 1)
    //     await addVotes({
    //         variables: { 
    //             vodId: comment._id,
    //             voteCount: count,
    //         }
    //     })
    // }
    
    return (
        <div key={comment._id} style={
            {
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center', 
                paddingTop: '10px',                
                paddingBottom: '20px'
            }}>
            {/* Adding upvote system. Still in progress. Need to add counter function*/}
            {/* Mui design for upvotes */}
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} style={{paddingRight: "10px"}}>
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
            <div style={{paddingLeft: '20px', paddingBottom: '20px', color: 'white', backgroundColor: '#5865F2', borderRadius: '15px', width: '80%'}}>
                <h5 className="card-header">
                {comment.commentAuthor} commented {' '}
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