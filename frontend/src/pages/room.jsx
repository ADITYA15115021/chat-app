

export default function CreateRoom(){
     
    
    return (
        <>
          <div className="bg-gray-100 h-screen flex flex-col justify-center">
            <div className="flex flex-row justify-center">
                <div className="h-64 w-72 border shadow-gray-500 shadow-lg rounded-lg
                              bg-white grid grid-cols-1 grid-rows-3 gap-1 p-2">
                    
                    <div className="flex justify-center items-center " >ENTER PASSOWRD</div>
                    
                    <div className="flex flex-col justify-start ">
                        <input className="w-full border border-black" ></input>
                    </div>
                    
                    <div className="flex justify-center items-center ">
                        <button className="w-full h-2/3 bg-green-200 border rounded-lg hover:bg-green-400 border-gray-300">CREATE ROOM</button>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}