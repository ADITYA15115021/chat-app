
import './index.css';

import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home";
import CreateRoom from "./pages/room";
import Chat from "./pages/chat";
import ValidateUser from "./pages/validate.jsx";

import SocketContext from "./pages/context.jsx";
import { useState,useEffect } from "react";


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const ws = new WebSocket("ws://localhost:3000");
      
      ws.onopen = () => {
          console.log("WebSocket connected with state:", ws.readyState);
          setSocket(ws);
      };

      ws.onclose = () => {
          console.log("WebSocket closed");
          setSocket(null);
      };

      return () => {
          if (ws.readyState === WebSocket.OPEN) {
              console.log("Cleaning up socket");
              ws.close();
          }
      };
  }, []); // Only run once when App mounts

  return (
      <BrowserRouter>
          <SocketContext.Provider value={socket}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/validate" element={<ValidateUser />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/create-room" element={<CreateRoom />} />
              </Routes>
          </SocketContext.Provider>
      </BrowserRouter>
  );
}

export default App
