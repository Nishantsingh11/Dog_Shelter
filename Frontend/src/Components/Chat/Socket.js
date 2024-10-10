import { io } from "socket.io-client"

const URl = "http://localhost:5000"
const socket = io(URl,
    {

        withCredentials: true,
    }

)

export default socket