import React, {useState} from 'react';
import ReatctPlayer from 'react-player';

const VideoPage = ({thoughts}) => {   
//  thought bubble state state then set timeout
// toast messages 3rd party
  
    const [comments, setComments] = useState('') 
    const handleComments = ({playedSeconds}) => {
        console.log({playedSeconds})          
        const toastThought = thoughts.find(thought => {
          return (Math.floor(playedSeconds) == thought.createdAt)
        })
      if (toastThought){
        setComments(toastThought.thoughtText)
      }
                     
    }
    return (
        <div>
          <ReatctPlayer
            url = 'https://www.youtube.com/watch?v=qrTXTO3FDOY'     
            controls = 'true'      
            onProgress = {handleComments}
          />  
          <p>{comments}</p>     
        </div>
    );
  };
export default VideoPage;