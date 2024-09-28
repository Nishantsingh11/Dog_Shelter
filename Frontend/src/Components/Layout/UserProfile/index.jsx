import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/Store/Slice/Auth.slice"
import { PawPrint, Mail, Phone, MapPin, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ClassySpinner from "../Common/Loading"

export default function Profile() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.auth.user?.data)
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

  }, [dispatch, user])
  return (
    isLoading ? <ClassySpinner /> :
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage alt="User's profile picture" src={user.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>John Doe</CardTitle>
                <p className="text-sm text-muted-foreground">{user.title || "Title"}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone || "Add a Phone number"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.location || "Add Your Location"}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>My Dogs</CardTitle>
            </CardHeader>
            <CardContent>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                  user.dogs && user.dogs.map((dog) => (
                    <Card key={dog.name}>
                      <CardContent className="p-4">
                        <img
                          alt={`${dog.name}, a ${dog.status?.toLowerCase()} dog`}
                          className="mb-3 h-32 w-full object-cover"
                          height="128"
                          src={dog.dogImages[0]}
                          style={{
                            aspectRatio: "128/128",
                            objectFit: "cover",
                          }}
                          width="128"
                        />
                        <h3 className="font-semibold">{dog.name}</h3>
                        <Badge variant={dog.status === "Adopted" ? "default" : "secondary"}>{dog.status}</Badge>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>My Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <PawPrint className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground">Dogs Helped</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <PawPrint className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">2</h3>
                  <p className="text-sm text-muted-foreground">Currently Fostering</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <PawPrint className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">1</h3>
                  <p className="text-sm text-muted-foreground">Adopted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}