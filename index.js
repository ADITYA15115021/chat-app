import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const port = 3000;
const server = new http.createServer();
server.listen(port,()=>{
     console.log(`server listening on port ${port}`);
}) 


let clients = {};

const rooms = { 
    room1 : "12345",
    room2 : "00000"
 }




const wss = new WebSocketServer({server});

wss.on( "connection", (socket,req)=>{
    
    socket.send("connected to websocket server !");
    
    socket.on( "message",(message)=>{
        
        const data = JSON.parse(message);
        console.log(data);
        const {action,room_id,password ,text} = data;

        if( action === "join" ){
            console.log("one request for joining!")
            if( rooms[room_id] && rooms[room_id] === password  ){
                socket.room = room_id;
                clients[socket] = room_id;
                socket.send(JSON.stringify( { msg : `joined to room wth id ${room_id}`} ) );
            }else{
                socket.send(JSON.stringify( {msg : "incorect password !" }));
            }
        }

        else if( action === "message" ){
             if( clients[socket] ){
                const curr_room = clients[socket];
                wss.clients.forEach( (client) => {
                    if( socket != client && client.room === curr_room ){
                        client.send(JSON.stringify( { data : text  } ));
                    }
                } )
             }else{
                socket.send(JSON.stringify({msg : "connect to a room first! "}))
             }
                
           
        }
    })

   



 
} )



// const port = 3000;
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//       data: 'Hello World!',
//     }));
//   });

// server.listen(port,()=>{
//     console.log(`server listening on port ${port}`);
// })  