import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "@/Store/Slice/Auth.slice"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, Send, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import axios from "axios"

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: "John Doe", lastMessage: "Thanks for the information!", timestamp: "10:30 AM", unread: 2 },
  { id: 2, name: "Jane Smith", lastMessage: "When can I visit the shelter?", timestamp: "Yesterday", unread: 0 },
  // Add more users...
]



const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState(mockUsers[0])
  const [searchTerm, setSearchTerm] = useState("")
  const scrollAreaRef = useRef(null)

  const { receiverId } = useParams()  // For extracting receiverId from URL
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)
  const senderId = useSelector((state) => state.auth.user?.data?._id)
  const userLoaded = useSelector((state) => state.auth?.user !== null)




  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/chat/getchatusers", {
      withCredentials: true
    }
    ).then((res) => {
      console.log("userl", res);
      setUsers(res.data)
      console.log("message", res.data);


    }).catch((err) => {
      console.log(err)
    })
  }, [])
  useEffect(() => {
    if (!userLoaded) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, userLoaded])

  // Scroll to bottom of messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, scrollAreaRef])

  useEffect(() => {
    if (senderId) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: senderId },
        transports: ["websocket"],
      })

      newSocket.on("connect", () => {
        console.log("Successfully connected to WebSocket")
      })

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err)
      })

      newSocket.on("disconnect", (reason) => {
        console.warn("Disconnected due to:", reason)
      })

      newSocket.on("receiveMessage", (message) => {
        console.log("New message received: ", message)
        setMessages((prev) => [...prev, message])
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [senderId])
  const handleSendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = {
        toUserId: receiverId,
        message: newMessage,
        senderId
      };

      socket.emit("sendMessage", messageData);
      console.log("Message sent: ", newMessage);

      // Append new message to state
      setMessages((prev) => [...prev, { ...messageData, timestamp: new Date().toLocaleTimeString() }]);
      setNewMessage("");

      // Update users for last message
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, lastMessage: newMessage, timestamp: "Just now", unread: 0 }
          : user
      );
      setUsers(updatedUsers);
      setSelectedUser({ ...selectedUser, lastMessage: newMessage, timestamp: "Just now", unread: 0 });
    } else {
      console.error("Socket not initialized or message is empty");
    }
  }



  const handleUserSelect = (id) => {
    axios.get("http://localhost:5000/api/v1/chat/getprevchat/" + id, { withCredentials: true }).then((res) => {
      console.log(res)
      setMessages(res.data)
    })
      .catch((err) => {
        console.log(err);

      })
    setMessages([]) // Fetch messages for the selected user here in a real app
  }


  let filteredUsers
  if (users) {

    filteredUsers = users?.participants?.filter(user =>
      user.username.toLowerCase()
    )
  }
  console.log("users", users);

  console.log("filtered", filteredUsers);







  // eslint-disable-next-line react/prop-types
  const Sidebar = ({ className = "" }) => (
    <Card className={`h-full ${className}`}>
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Recent Chats</span>
          <PawPrint className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-14rem)]">
          {users && users.map((user) => (
            <div

              key={user.participants._id}
              className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer ${selectedUser.id === user.participants._id ? "bg-gray-200" : ""
                }`}
              onClick={() => handleUserSelect(user.participants._id)}
            >
              {console.log("userfromcontainer", user)}
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user?.participants.username?.charAt(0)}`} alt={user.participants.username} />
                <AvatarFallback>{user.participants.username?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.participants.username}</p>
                <p className="text-sm text-gray-500 truncate">{user.participants.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-gray-500">{user.timestamp}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920&text=Dog+Shelter+Background')" }}></div>
      <div className="w-full max-w-6xl z-10 flex gap-4 h-[calc(100vh-2rem)]">
        <Sidebar className="hidden md:block w-1/3" />
        <Card className="flex-1 flex flex-col">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="p-0 md:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <Sidebar />
                  </SheetContent>
                </Sheet>
                <PawPrint className="ml-2 mr-2 h-6 w-6" />
                Chat with {selectedUser.username}
              </div>
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${selectedUser.username?.charAt(0)}`} alt={selectedUser.username} />
                <AvatarFallback>{selectedUser?.username?.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.senderId?._id === senderId || msg.senderId === senderId ? "justify-end" : "justify-start"
                    } mb-4`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${msg.senderId?._id === senderId || msg.senderId === senderId
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                      }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4">
            <div className="flex items-center w-full">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="mr-2 flex-grow"
              />
              <Button variant="outline" onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ChatApp
