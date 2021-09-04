import React,{useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import axios from 'axios'
import '../App.css'
import socketio from 'socket.io-client';

const Youtube =()=>{
    const [youtubeId,setYoutubeId]=useState("")

    useEffect(()=>{
      const socket = socketio.connect('http://localhost:3001/');
      console.log("hihhi")
      socket.on('videoID', (msg) => {
        console.log("id"+msg);
        if(msg!==""){
          setYoutubeId(msg)
        }
      });
    },[])

    // let giveId = async(e)=>{
    //   let data={
    //     type:"front"
    //   }
    //   const res = await axios.post("http://localhost:3001/getdata",data)
    //   console.log(res.data)
    //   setYoutubeId(res.data)
    // }


      return(
        // muted={true} 해야 재생이 됨..ㅜ_ㅜ
      <div className="youtube-class">
          <ReactPlayer url={'https://www.youtube.com/watch?v='+youtubeId} playing={true} controls/>
      </div>
     
      )
    
    
  
}

export default Youtube;