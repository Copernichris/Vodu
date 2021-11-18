import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoPage = ({ video, comments }) => {
  //  thought bubble state state then set timeout
  // toast messages 3rd party
  const [tips, setTips] = useState("");
  const notify = () => toast(tips);
  const isFirstRender = useRef(true);
  const url = video.vodUrl;
  const handleComments = ({ playedSeconds }) => {
    console.log({ playedSeconds });
    const myTips = comments.find((comment) => {
      return Math.floor(playedSeconds) == comment.timeStamp;
    });
    if (myTips) {
      setTips(myTips.commentText);  
    } 
  }; 
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false 
        return;
      }
      notify();
   }, [tips]);

    return (      
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: '20px'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "96%", height: "54%"}}>
          <ReactPlayer
            url = {url}    
            controls = 'true'      
            onProgress = {handleComments} 
            width = '100%'
            height = '80vh'
          /> 
        </div>
        <div>          
          <ToastContainer/>
        </div>            
      </div>                                       
    );
  }; 
export default VideoPage;
