import { useContext, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import SocketContext from "./context";

export default function ValidateUser() {
    const [input, setInput] = useState("");
    const [name,setName] = useState("");

    const [invalid, setInvalid] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    
    useEffect(() => {
        if (!location.state?.roomId) {
            navigate('/');
            return;
        }
        if (!socket) {
            navigate('/', { state: { error: 'Connection lost. Please try again.' } });
            return;
        }
    }, [location.state, socket, navigate]);

    const roomId = location.state?.roomId;

    // Handle socket messages
    useEffect(() => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            return;
        }

        const handleMessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                if (parsedData.status === "success") {
                    console.log("name is ",name);
                    navigate("/chat", { state: { roomId : roomId, username : name } });
                } else if (parsedData.status === "failure") {
                    setInvalid(parsedData.msg);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket, navigate, roomId,name]);



    const enterRoom = () => {
        if (!socket || !input.trim()) {
            return;
        }

        const tryToSendMessage = () => {
            if (socket.readyState === WebSocket.OPEN) {
                console.log(name);
                const messageData = {
                    type: "JOIN_ROOM",
                    payload: { roomId, password: input.trim() , username : name },
                };
                socket.send(JSON.stringify(messageData));
                setInvalid(null); // Clear any previous error messages
            } else if (socket.readyState === WebSocket.CONNECTING) {
                setTimeout(tryToSendMessage, 100);
            } else {
                setInvalid("Connection lost. Please refresh the page.");
                navigate('/', { state: { error: 'Connection lost. Please try again.' } });
            }
        };

        tryToSendMessage();
    };

    if (!socket || !roomId) {
        return null; // or a loading spinner
    }

   

    
    return(
        <>
          <div className=" bg-gray-100 h-screen flex flex-col justify-center">
            <div className="flex flex-row justify-center"> 
                
                <div className="shadow-lg shadow-gray-700 bg-white h-80 w-80 border border-gray-300 rounded-lg
                                 flex flex-col ">
                   
                   <div className="mt-4 h-2/3 flex flex-col justify-evenly">

                        <label className="text-center text-2xl">ENTER  PASSWORD</label>
                        <input onChange={(e)=>{setInput(e.target.value)}} className="mx-12 border rounded-lg border-gray-400"></input>
                        <div className="">{invalid && <p>{invalid}</p>}</div>
                    </div>

                    <div className="flex flex-col h-2/3  justify-evenly  items-center">
                        <label className="text-2xl">ENTER NAME</label>
                        <input onChange={(e)=>{setName(e.target.value)}} className="w-56 border rounded-lg border-black"></input>
                    </div>

                   <div className="mt-8 mb-8 flex-1 flex flex-col justify-center
                                    ">
                       <button  onClick={()=>{enterRoom()}} className="mx-10 h-8 rounded-lg w-3/4 bg-green-300 hover:bg-green-400">ENTER ROOM</button> 
                   </div>
                   
                </div> 
            </div>
          </div>
        </>
    )
}