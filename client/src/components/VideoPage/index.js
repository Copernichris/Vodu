import React, {useState} from 'react';
import ReatctPlayer from 'react-player';

const VideoPage = ({thought, comments}) => {   
//  thought bubble state state then set timeout
// toast messages 3rd party
  
    const [tips, setTips] = useState('') 
    const handleComments = ({playedSeconds}) => {
        console.log({playedSeconds})          
        const toastThought = comments.find(comment => {
          return (Math.floor(playedSeconds) == comment.createdAt)
        })
      if (toastThought){
        setTips(toastThought.commentText)
      }
                     
    }
    return (
        <div>
          <ReatctPlayer
            url = {thought.thoughtText}     
            controls = 'true'      
            onProgress = {handleComments}
          />  
          <p>{tips}</p>     
        </div>
    );
  };
export default VideoPage;