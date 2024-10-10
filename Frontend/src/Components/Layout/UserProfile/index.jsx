import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { changePassword, getCurrentUser, updateUser } from "@/Store/Slice/Auth.slice"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ClassySpinner from "../Common/Loading"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Bell, MessageCircle, Settings } from "lucide-react"

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [passwordModel, setPasswordModel] = useState(false)

  const user = useSelector((state) => state.auth.user?.data)
  console.log(user);

  const [updatedUser, setUpdatedUser] = useState(
    {
      name: user?.name || "",
      avatar: "",
      description: user?.description || "",
      phone: user?.phone || "",
      location: user?.location || "",

    }
  )
  const [ischangepassword, setIsChangePassword] = useState(
    {
      new_password: "",
      current_password: "",
      confirm_password: ""
    }
  )
  useEffect(() => {
    if (!user) {
      const fetchUserProfile = async () => {
        await dispatch(getCurrentUser()).unwrap()
        setIsLoading(false)
      }
      fetchUserProfile()
    } else {
      setIsLoading(false)
    }
    if (user) {
      setUpdatedUser({
        name: user?.name || "",
        avatar: "",
        description: user?.description || "",
        phone: user?.phone || "",
        location: user?.location || "",
      });
    }
  }, [dispatch, user])

  const trimedDog = (dog) => {
    if (dog.length > 6) {
      return dog.slice(0, 6)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateUser(updatedUser)).unwrap()
    handleModelChange()
    setIsLoading(true)
    await dispatch(getCurrentUser()).unwrap()
    setIsLoading(false)

  }
  const handleInputChange = (e) => {

    const { name, value } = e.target
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    })
  }
  console.log("user", updatedUser);


  const handleModelChange = () => {
    setIsOpen((prev) => !prev)
    console.log("model changed");

  }

  const handleResetForm = () => {
    setUpdatedUser({
      name: user?.name || "",
      avatar: "",
      description: user?.description || "",
      phone: user?.phone || "",
      location: user?.location || "",
    })
  }
  const handleChangepassword = () => {
    setPasswordModel(!passwordModel)
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    await dispatch(changePassword(ischangepassword)).unwrap().then((res) => {
      console.log("password change", res);

    }).catch((err) => {

      console.log("somthing went wront", err);
    })


  }
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setIsChangePassword({
      ...ischangepassword,
      [name]: value
    })
  }
  console.log(ischangepassword);

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? <ClassySpinner /> :
        (
          <>
        

            {/* Banner */}
            <div
              className="relative h-64 bg-gray-800 mt-16"
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={user.coverImage}
                alt="Banner"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">Make things that matter</h1>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex">
                {/* Left Sidebar */}
                <div className="w-64 flex-shrink-0 mr-8">
                  <div className="sticky top-24">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={user.avatar} alt="Peter Deltondo" />
                            <AvatarFallback>PD</AvatarFallback>
                          </Avatar>
                          <h2 className="text-xl font-semibold">{user.name}</h2>
                          <p className="text-sm text-muted-foreground">{user.description}</p>
                        </div>
                        <div className="mt-6">
                          <h3 className="font-semibold mb-2">Contact</h3>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                              </svg>
                            </Button>
                            <Button variant="outline" size="icon">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                              </svg>
                            </Button>
                            <Button variant="outline" size="icon">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="font-semibold mb-2">Team</h3>
                          <Badge className="mr-1">P</Badge>
                          <h3 className="font-semibold mt-4 mb-2">Team Members</h3>
                          <div className="flex -space-x-2">
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=1" alt="Team Member 1" />
                              <AvatarFallback>1</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=2" alt="Team Member 2" />
                              <AvatarFallback>2</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=3" alt="Team Member 3" />
                              <AvatarFallback>3</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-8 w-8 border-2 border-background">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=4" alt="Team Member 4" />
                              <AvatarFallback>4</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Main Content (Scrollable) */}
                <div className="flex-1">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        I am the Creative Director at Platoon, a product-focused design agency. Consistently I look to conceptualize and work with talented individuals to create unique work that has a positive impact on the world.
                      </p>
                    </CardContent>
                  </Card>
                  {

                    user && user.dogs && user.dogs.map((dog, index) => (
                      <Card key={index} className="mb-6">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={user.avatar} alt={dog.name} />
                              <AvatarFallback>PD</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Peter Deltondo</h3>
                              <p className="text-sm text-muted-foreground">2 hours ago</p>
                            </div>
                          </div>
                          <p className="mb-4">
                           {dog.description}
                          </p>
                          <img
                            src={dog.dogImages[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKm5ozlcCy7mzhzGfa5JlXjpa5a6iGAugyQ&s"}
                            alt={dog.name}
                            className="w-full rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="w-64 flex-shrink-0 ml-8">
                  <div className="sticky top-24">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Strategies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2].map((_, index) => (
                            <div key={index} className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-semibold">BEST LAP TURNS 2-4</h4>
                                <div className="flex items-center">
                                  <div className="relative w-16 h-16">
                                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                                      <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#4CAF50"
                                        strokeWidth="2"
                                        strokeDasharray="100, 100"
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-2xl font-bold">197</span>
                                    </div>
                                  </div>
                                  <span className="ml-4 text-lg font-semibold">02:54:12</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div >
          </>
        )
      }
    </div >
  )
}
