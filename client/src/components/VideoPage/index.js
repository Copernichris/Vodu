import React, {useState} from 'react';
import ReatctPlayer from 'react-player';

const VideoPage = ({video, comments}) => {   
//  thought bubble state state then set timeout
// toast messages 3rd party
  
    const [tips, setTips] = useState('') 
    const url = video.thoughtText;
    const handleComments = ({playedSeconds}) => {
        console.log({playedSeconds})          
        const toastTip = comments.find(comment => {
          return (Math.floor(playedSeconds) == comment.createdAt)
        })
      if (toastTip){
        setTips(toastTip.commentText)
      }
                     
    }
    return (
        <div>
          <ReatctPlayer
            url = {url}    
            controls = 'true'      
            onProgress = {handleComments}
          />  
          <p>{tips}</p>     
        </div>
    );
  };
export default VideoPage;