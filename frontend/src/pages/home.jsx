import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import SocketContext from "./context";

export default function Home() {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const handleRoomClick = (roomId) => {
        console.log("Current socket state:", socket?.readyState);
        if (socket && socket.readyState === WebSocket.OPEN) {
            navigate('/validate', { state: { roomId } });
        }
    };


   return (
            <>
               <div className="h-screen bg-gray-200 flex">
    
                  <div className="m-2 w-full 
                                  flex flex-col">
                        <div className="h-24 border-b border-gray-800 shadow-md rounded-lg 
                                        bg-white flex flex-row justify-center p-4">
                            
                            <button onClick={()=>{navigate("/create-room")}} 
                            className="w-40 bg-green-200 hover:bg-green-500 border rounded-full ">CREATE ROOM</button>    
                        
                        </div>
    
                        <div className="mt-8 h-screen">
                                
                            <div className="m-8  h-3/4
                                grid grid-cols-5 grid-rows-2 gap-2 ">
                                <button onClick={()=>{ handleRoomClick("room1") } }  className="transition-transform hover:scale-110 hover:bg-gray-100  hover: bg-white m-4 border rounded-lg shadow-gray-500 shadow-md">ROOM1</button>
                                <button onClick={()=>{ handleRoomClick("room1") } }  className="transition-transform hover:scale-110 hover:bg-gray-100 bg-white m-4 border rounded-lg shadow-gray-500 shadow-md">ROOM2</button>
                            </div>            
    
                        </div>
    
    
                  </div>
                  
    
                  
               </div> 
            </>
        )   
    }
    
    


