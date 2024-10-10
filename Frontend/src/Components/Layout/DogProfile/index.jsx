import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getDogById, updateDog } from "@/Store/Slice/Dog.sclice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, Edit, PawPrint, Heart, Users, Home } from "lucide-react"
import { Label } from "@/components/ui/label"
export default function EnhancedDogDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dog = useSelector((state) => state.dogs.dogs?.data?.dog)
    console.log("dogs", dog);
    const [isLoading, setIsLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [editedDog, setEditedDog] = useState({})

    useEffect(() => {
        const fetchDogProfile = async () => {
            await dispatch(getDogById(id)).unwrap()
            setIsLoading(false)
        }
        fetchDogProfile()
    }, [dispatch, id])

    useEffect(() => {
        if (dog) {
            setEditedDog()
        }
    }, [dog])
    const handleAdoptToChat = () => {
        navigate(`/chat/${dog.owner[0]._id}`)
        console.log("Adopt to chat",dog.owner[0]._id);
    }

    const dogUnresultImage = "https://img.freepik.com/premium-vector/cartoon-dog-with-red-background-dog-animal-animal-animal-animal-animal-hd-wallpaper_239711-2.jpg"

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? (dog?.dogImages?.length || 1) - 1 : prevIndex - 1
        )
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === (dog?.dogImages?.length || 1) - 1 ? 0 : prevIndex + 1
        )
    }

    useEffect(() => {
        const timer = setInterval(nextImage, 5000) // Change image every 5 seconds
        return () => clearInterval(timer)
    }, [dog])

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
        if (!isEditing) {
            setEditedDog(dog)
        }
    }

    const handleSaveAll = async () => {
        try {
            await dispatch(updateDog({ id: dog.id, ...editedDog })).unwrap()
            setIsEditing(false)
            console.log("Dog updated successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (field, value) => {
        setEditedDog({ ...editedDog, [field]: value })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8 px-4">
            <div className="absolute top-14 left-0 w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6CxPPfJoorCA9QugPAXhk-S-pmSuN_I_jLpEvEWG1P9mZ4fTOCHRWfYGtTgpBTVCOhIa56OrExUwz-Bw-G04JeQqPVU11uAj6GbNBe0AiT1N-YcKQuEjJFT8px0Z6s3QyJe_FTCI4-Tyk/w1920-h1080-c/anime-girl-with-dog-uhdpaper.com-4K-147.jpg')" }}></div>
            <div className="container mx-auto max-w-7xl relative z-10">
                <Card className="mb-8 overflow-hidden">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-8 bg-primary text-white flex flex-col justify-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">A WORLD OF PAWSIBILITIES</h1>
                            <p className="mb-6">Discover the unique charm and personality of our furry friends. Each dog brings its own colors to your life, creating a vibrant tapestry of companionship and joy.</p>
                            <Button className="self-start" variant="secondary">Meet Our Dogs</Button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={dog?.dogImages[0] || dogUnresultImage}
                                alt="Colorful Dog"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                useNavigate

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <PawPrint className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl mb-2">Our Mission</CardTitle>
                            <CardDescription>To rescue, rehabilitate, and rehome dogs in need, giving them a second chance at happiness.</CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl mb-2">Our Passion</CardTitle>
                            <CardDescription>We believe every dog deserves love, care, and a forever home, regardless of their past or special needs.</CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl mb-2">Our Team</CardTitle>
                            <CardDescription>Dedicated volunteers and professionals working tirelessly to make a difference in dogs' lives.</CardDescription>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                            <CardTitle className="text-xl mb-2">Our Shelter</CardTitle>
                            <CardDescription>A safe haven where dogs receive love, medical care, and preparation for their forever homes.</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-3xl font-bold">Featured Dog: {isEditing ? editedDog.name : dog.name}</CardTitle>
                            <Button onClick={handleEditToggle} variant="outline" className="flex items-center gap-2">
                                <Edit size={16} />
                                {isEditing ? "Cancel" : "Edit"}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 relative">
                                <img
                                    src={dog?.dogImages[currentImageIndex] || dogUnresultImage}
                                    alt={`${dog.name} - Image ${currentImageIndex + 1}`}
                                    className="w-full h-[400px] object-cover rounded-lg"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="md:w-1/2">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                value={editedDog.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                placeholder="Dog's Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={editedDog.description}
                                                onChange={(e) => handleChange('description', e.target.value)}
                                                placeholder="Description"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="breed">Breed</Label>
                                            <Input
                                                id="breed"
                                                value={editedDog.breed}
                                                onChange={(e) => handleChange('breed', e.target.value)}
                                                placeholder="Breed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="age">Age</Label>
                                            <Input
                                                id="age"
                                                value={editedDog.age}
                                                onChange={(e) => handleChange('age', e.target.value)}
                                                placeholder="Age"
                                                type="number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <Input
                                                id="gender"
                                                value={editedDog.gender}
                                                onChange={(e) => handleChange('gender', e.target.value)}
                                                placeholder="Gender"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">Weight</Label>
                                            <Input
                                                id="weight"
                                                value={editedDog.weight}
                                                onChange={(e) => handleChange('weight', e.target.value)}
                                                placeholder="Weight"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="temperament">Temperament</Label>
                                            <Input
                                                id="temperament"
                                                value={editedDog.temperament}
                                                onChange={(e) => handleChange('temperament', e.target.value)}
                                                placeholder="Temperament (comma-separated)"
                                            />
                                        </div>
                                        <Button onClick={handleSaveAll} className="w-full">Save Changes</Button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-4 text-gray-600">{dog.description}</p>
                                        <ul className="mb-6 space-y-2">
                                            <li><strong>Breed:</strong> {dog.breed}</li>
                                            <li><strong>Age:</strong> {dog.age} years</li>
                                            <li><strong>Gender:</strong> {dog.gender}</li>
                                            <li><strong>Weight:</strong> {dog.weight}</li>
                                            <li><strong>Temperament:</strong> {dog.temperament}</li>
                                        </ul>
                                        <Button className="w-full" onClick={handleAdoptToChat}>
                                            <Heart className="mr-2 h-4 w-4" />
                                            Adopt {dog.name}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Why Adopt?</CardTitle>
                        <CardDescription>Open your heart and home to a furry friend in need</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            Adopting a dog is a rewarding experience that changes both your life and the life of your new companion.
                            By choosing to adopt, you're giving a deserving dog a second chance at happiness and gaining a loyal friend for life.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            <PawPrint className="mr-2 h-4 w-4" />
                            Start Your Adoption Journey
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}