import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, User, EyeOff, EyeIcon, PawPrint } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser, loginUser } from "@/Store/Slice/Auth.slice"
import { useToast } from "@/hooks/use-toast"

export default function EnhancedAuthPage() {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [passwordMatchError, setPasswordMatchError] = useState("")

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
    const [activeTab, setActiveTab] = useState("login")

    async function onSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        if (activeTab === "login") {
            await dispatch(loginUser(data)).unwrap().then(() => {
                toast({
                    title: "Logged in successfully",
                    type: "success",
                })
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
                toast({
                    title: "Error",
                    description: error,
                    type: "error",
                })
                console.log("error", error)
                setIsLoading(false)
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
                toast({
                    title: "Account created successfully",
                    type: "success",
                })
                setIsLoading(false)
                setActiveTab("login")
            })
        }
    }

    const handleIsPasswordShow = () => {
        setIsShowPassword(!isShowPassword)
    }

    const handleConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value
        setData({ ...data, confirm_password: confirmPassword })

        if (confirmPassword !== data.password) {
            setPasswordMatchError("Passwords do not match")
        } else {
            setPasswordMatchError("")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
            <div className="absolute top-14 left-0 w-full h-full bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://i.pinimg.com/originals/4d/64/4b/4d644bbbd311b4ab259f3ebbafe75f48.jpg')"}}></div>
            <div className="z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4 text-primary">Second Chance Paws</h1>
                    <p className="text-xl mb-6 text-gray-700">Give a furry friend a loving home. Your perfect companion is waiting for you!</p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <PawPrint size={48} className="text-primary animate-bounce" />
                        <PawPrint size={48} className="text-primary animate-bounce delay-100" />
                        <PawPrint size={48} className="text-primary animate-bounce delay-200" />
                    </div>
                </div>
                <Card className="w-full md:w-1/2 max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Welcome</CardTitle>
                        <CardDescription>
                            Login or create an account to start your adoption journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <form onSubmit={onSubmit}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="m@example.com"
                                                onChange={(e) => setData({ ...data, email: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2 relative">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type={isShowPassword ? "text" : "password"}
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                                required
                                            />
                                            <span className="absolute inset-y-0 right-0 pr-3 top-7 flex items-center cursor-pointer" onClick={handleIsPasswordShow}>
                                                {isShowPassword ? <EyeIcon className="h-4 w-4 text-gray-500" /> : <EyeOff className="h-4 w-4 text-gray-500" />}
                                            </span>
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
                                    <div className="space-y-4">
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
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            {passwordMatchError && <p className="text-red-600 text-sm">{passwordMatchError}</p>}
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
                                        <Button className="w-full" type="submit" disabled={isLoading || passwordMatchError}>
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
        </div>
    )
}