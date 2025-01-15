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
               <div className="h-screen bg-gray-100 flex">
    
                  <div className="m-2 w-full border border-black
                                  flex flex-col">
                        <div className="h-24 border rounded-lg border-red-300
                                        flex flex-row justify-center p-4">
                            
                            <button onClick={()=>{navigate("/create-room")}} 
                            className="w-40 bg-green-200 hover:bg-green-500 border rounded-full border-green-300">CREATE ROOM</button>    
                        
                        </div>
    
                        <div className="mt-8 h-screen border border-red-700">
                                
                            <div className="m-8 border border-black h-3/4
                                 grid grid-cols-5 grid-rows-2 gap-2 ">
                                <button onClick={()=>{ handleRoomClick("room1") } }  className="m-4 border border-red-500">ROOM1</button>
                            </div>            
    
                        </div>
    
    
                  </div>
                  
    
                  
               </div> 
            </>
        )   
    }
    
    


