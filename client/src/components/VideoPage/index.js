import React, {useState} from 'react';
import ReatctPlayer from 'react-player';

const VideoPage = ({video, comments}) => {   
//  thought bubble state state then set timeout
// toast messages 3rd party
    const [tips, setTips] = useState(''); 
    
    const url = video.vodUrl;
    const handleComments = ({playedSeconds}) => {
        console.log({playedSeconds})          
        const myTips = comments.find(comment => {
          return (Math.floor(playedSeconds) == comment.timeStamp)
        })
      if (myTips){
        setTips(myTips.commentText)       
      }               
    }
    return (
      <div>
        <ReatctPlayer
              url = {url}    
              controls = 'true'      
              onProgress = {handleComments} 
              width = '100%'
              height = '80vh'
            /> 
            <p>{tips}</p>
      </div>                                       
    );
  };
export default VideoPage;