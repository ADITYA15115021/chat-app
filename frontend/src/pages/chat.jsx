import { useState,useEffect } from "react"
import SocketContext from "./context";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const name = location.state.username;

  // Handle incoming messages
  useEffect(() => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
          return;
      }

      // Create a separate handler function
      const handleMessage = (event) => {
          try {
              const message = JSON.parse(event.data);
              console.log("Received message:", message);
              setMessages(prevMessages => [...prevMessages, message]);
          } catch (error) {
              console.error("Error parsing message:", error);
          }
      };

      // Use addEventListener instead of onmessage
      socket.addEventListener('message', handleMessage);

      // Cleanup
      return () => {
          socket.removeEventListener('message', handleMessage);
      };
  }, [socket]); // Only depend on socket

  // Separate function for sending messages
  const sendMessage = () => {
    console.log("send msg is triggered!")
      if (!socket || 
          socket.readyState !== WebSocket.OPEN || 
          !newMessage.trim()) {
          console.log("some issue");
          console.log("msg is ",newMessage); 
          return;
      }

      const messageData = {
          type: "CHAT_MESSAGE",
          payload: {
              username: name,
              message: newMessage.trim()
          }
      };

      console.log(messageData);

      try {
         setMessages(prevMessages => [...prevMessages, messageData.payload]);
          socket.send(JSON.stringify(messageData));
          setNewMessage("");
          const inputElement = document.querySelector("#chatInput");
          inputElement.value = "";
          console.log("message send")
      } catch (error) {
          console.error("Error sending message:", error);
      }
  };

 

    return (
        <>

        <div className="bg-gray-200 h-screen flex flex-col justify-center">
            <div className="h-3/4 flex flex-row justify-center">
               <div className="w-2/3  flex flex-col justify-between">
                    
                    <div className="flex-1 overflow-y-auto scrollbar-hide mb-4 bg-white border  shadow-gray-500 shadow-md rounded-lg">
                     
                      <div className="clearfix  mb-4 flex-1 
                                    flex flex-col ">
                        {messages.map((msg, index) => (
                              <MessageComponent key={index} msg={msg} name={name} />
                          ))}
                      </div>

                    </div>
                   

                    <div className="h-12 flex flex-row justify-between">
                      <input id="chatInput" type="text" onChange={(e)=>{ setNewMessage(e.target.value) }} className="pl-3 flex-1 border shadow-gray-500 shadow-lg rounded-lg"></input>
                      <button onClick={()=> sendMessage()} className="hover:bg-green-300 border rounded-full ml-6 w-20 bg-green-200">SEND</button>
                    </div>
               
               </div>
            </div>
            
        </div> 

         
        </>
    )
}


function MessageComponent({msg,name}){
   
  
   const {username,message} = msg;
   let isOwner = "";
   if( username === name ){
    isOwner = true
   }else{
    isOwner = false;
   }

    return(
        <>
         <div className= {`${isOwner ? 'self-end bg-green-100 mr-6 ': 'self-start ml-6' }
                          p-1 min-h-[50px] max-h-[300px] overflow-auto m-3   max-w-max border rounded-lg border-gray-300
                          flex flex-col`}>
            <div className="px-2 text-red-600">~{username}</div>
            <div className="px-2 text-black">{message}</div>
         </div>
        </>
    )
}