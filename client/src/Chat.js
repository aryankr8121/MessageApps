import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {MdAccountCircle} from "react-icons/md";
import {BsFillSendCheckFill,BsEmojiWinkFill} from "react-icons/bs";
// import EmojiPicker from 'emoji-picker-react';
// import Emoji from "./em";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [sho ,setSho]=useState('');
  const show=()=>{
    alert(sho);
      if(sho==='hidea'){
        setSho('show');
      }else{
        setSho('hidea');
      }
  }
  const sendMessage = async () => {
    
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
 
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
 // const [inputValue, setInputValue] = useState('');

  const addEmoji = (emoji) => {
    setCurrentMessage((prevValue) => prevValue + emoji);
  };

  const toggleEmojiDrawer = () => {
    setIsDrawerVisible((prevValue) => !prevValue);
  };

 

  return (
    <div className="chat-window">
      
      <div className="chat-header shadow p-2 bg-body-tertiary rounded">
        <div className="head"><MdAccountCircle/></div>
        <div className="head user">{username}</div>
      </div>
      <div className="chat-body">
        
        <div>
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="lists">
                  <div id=" author">
                    <div id="authpro">
                      hi
                    </div>
                    <div className="authname"><h4>{messageContent.author}</h4></div>
                    </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        </div>
      </div>
     
      <div className="chat-footer  shadow p-2 bg-body-tertiary rounded">
        <input
          type="text"
          id="input"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
             //setInputValue(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <button onClick={sendMessage}><BsFillSendCheckFill/></button>
        <button onClick={toggleEmojiDrawer}>Emojis</button>
 
    <div id="popse">

      <div id="pops" className={`emoji-drawer ${isDrawerVisible ? '' : 'hidden'}`}>
        <div className="emoji" onClick={() => addEmoji('😀')}>
          😀
        </div>
        <div className="emoji" onClick={() => addEmoji('😃')}>
          😃
        </div>
        <div className="emoji" onClick={() => addEmoji('😄')}>
          😄
        </div>
        <div className="emoji" onClick={() => addEmoji('😁')}>
          😁
        </div>
        <div className="emoji" onClick={() => addEmoji('😆')}>
          😆
        </div>
      </div>

     
    </div>
  
      </div>
    </div>
  );
}

export default Chat;
