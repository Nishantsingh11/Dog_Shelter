
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, User } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser, loginUser } from "@/Store/Slice/Auth.slice"
export default function AuthPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        username: "",
        avatar: null,
        coverImage: null
    })


    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("login"); // Track active tab

    async function onSubmit(e) {

        e.preventDefault()
        setIsLoading(true)
        if (activeTab === "login") {
            await dispatch(loginUser(data)).unwrap().then(() => {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    username: "",
                    avatar: null,
                    coverImage: null
                })
                navigate("/")
            }).catch((error) => {
                console.log("error", error);

            })


        } else {
            await dispatch(registerUser(data)).unwrap().then(() => {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    username: "",
                    avatar: null,
                    coverImage: null
                })


            })
        }

    }

    return (
        <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Welcome to Second Chance Paws</CardTitle>
                    <CardDescription>
                        Login or create an account to start your adoption journey
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={onSubmit}>
                                <div className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="m@example.com"
                                            onChange={(e) => setData({ ...data, email: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
                                    </div>
                                    <Button className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Mail className="mr-2 h-4 w-4 animate-spin" />
                                                Logging in...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Login
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={onSubmit}>
                                <div className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-name">Name</Label>
                                        <Input id="new-name" type="text" placeholder="John Doe"
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-email">Email</Label>
                                        <Input id="new-email" type="email" placeholder="m@example.com"
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                            required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">Password</Label>
                                        <Input id="new-password" type="password" required
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" required
                                            onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" type="text" required
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                        />

                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="avatar">Avatar</Label>
                                        <Input id="avatar" type="file"
                                            onChange={(e) => setData({ ...data, avatar: e.target.files[0] })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cover-image">Cover Image</Label>
                                        <Input id="cover-image" type="file"
                                            onChange={(e) => setData({ ...data, coverImage: e.target.files[0] })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="terms" className="flex items-center">
                                            <input type="checkbox" id="terms" className="mr-2" required />
                                            I agree to the{" "}
                                            <a href="#" className="underline underline-offset-2 hover:text-primary">
                                                Terms of Service
                                            </a>
                                        </Label>
                                    </div>
                                    <Button className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <User className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                <User className="mr-2 h-4 w-4" />
                                                Create Account
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-center w-full text-gray-500">
                        By logging in or creating an account, you agree to our{" "}
                        <a href="#" className="underline underline-offset-2 hover:text-primary">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline underline-offset-2 hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}