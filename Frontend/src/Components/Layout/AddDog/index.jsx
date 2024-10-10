import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Link } from "react-router-dom"
import { X, Plus, PawPrint, Camera } from "lucide-react"
import { useDispatch } from "react-redux"
import { addNewDog } from "@/Store/Slice/Dog.sclice"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
export default function AddNewDogPage() {
    const {toast} = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const [images, setImages] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        breed: "",
        age: "",
        gender: "",
        size: "",
        weight: "",
        disability: "",
        description: "",
        location: "",
        dateArrived: "",
        medicalNeeds: "",
        isHouseTrained: false,
        isGoodWithKids: false,
        isGoodWithOtherDogs: false,
        isGoodWithCats: false,
        dogImages: []
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name) => (value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name) => (checked) => {
        setFormData(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        toast({
            title: "Adding new dog... Uploading image can take some time depending on the file size.",
            type: "info",
        })
        try {
            
        
            await dispatch(addNewDog(formData)).unwrap()
            setFormData({
                name: "",
                breed: "",
                age: "",
                gender: "",
                size: "",
                weight: "",
                disability: "",
                description: "",
                location: "",
                dateArrived: "",
                medicalNeeds: "",
                isHouseTrained: false,
                isGoodWithKids: false,
                isGoodWithOtherDogs: false,
                isGoodWithCats: false,
                dogImages: []
            })
            toast({
                title: "Dog added successfully",
                type: "success",
            })
            navigate("/admin/dogs")
        } catch (error) {
            toast({
                title: "Failed to add dog",
                description: error.message || "Something went wrong, please try again.",
                type: "error",
                
            })
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || [])

        if (images.length + files.length > 10) {
            console.log("You can only upload a maximum of 10 images at a time.")
            return
        }

        const newImages = files.map(file => ({
            id: URL.createObjectURL(file),
            file,
            preview: URL.createObjectURL(file)
        }))

        setImages(prevImages => [...prevImages, ...newImages])
        setFormData(prev => ({ ...prev, dogImages: [...prev.dogImages, ...files] }))
    }

    const removeImage = (id) => {
        setImages(prevImages => {
            const imageToRemove = prevImages.find(img => img.id === id)
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview)
            }
            return prevImages.filter(img => img.id !== id)
        })
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 flex flex-col items-center justify-center p-4">
            <div className="absolute top-14 left-0 w-full h-full bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://img.freepik.com/free-photo/3d-rendering-cartoon-dog-portrait_23-2150907260.jpg')"}}></div>
            <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-8">
                <div className="w-full text-center">
                    <h1 className="text-4xl font-bold mb-4 text-primary">Add New Dog</h1>
                    <p className="text-xl mb-6 text-gray-700">Help a furry friend find their forever home by adding them to our database.</p>
                    <div className="flex justify-center space-x-4">
                        <PawPrint size={48} className="text-primary animate-bounce" />
                        <PawPrint size={48} className="text-primary animate-bounce delay-100" />
                        <PawPrint size={48} className="text-primary animate-bounce delay-200" />
                    </div>
                </div>
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle>Dog Details</CardTitle>
                        <CardDescription>Enter the details of the new dog to add to the shelter database.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="breed">Breed</Label>
                                    <Input id="breed" name="breed" value={formData.breed} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select name="gender" onValueChange={handleSelectChange("gender")} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="size">Size</Label>
                                    <Select name="size" onValueChange={handleSelectChange("size")} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Small</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="large">Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="disability">Disability</Label>
                                    <Input id="disability" name="disability" value={formData.disability} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateArrived">Date Arrived</Label>
                                    <Input id="dateArrived" name="dateArrived" type="date" value={formData.dateArrived} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="medicalNeeds">Medical Needs</Label>
                                    <Textarea id="medicalNeeds" name="medicalNeeds" value={formData.medicalNeeds} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Dog Images</Label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {images.map((image) => (
                                            <div key={image.id} className="relative group">
                                                <img
                                                    src={image.preview}
                                                    alt={`Preview of ${image.file.name}`}
                                                    className="w-24 h-24 object-cover rounded-md"
                                                />
                                                <button
                                                    onClick={() => removeImage(image.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove ${image.file.name}`}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        {images.length < 10 && (
                                            <button
                                                type="button"
                                                onClick={handleUploadClick}
                                                className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-primary transition-colors"
                                            >
                                                <Camera size={24} className="text-gray-400" />
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="isHouseTrained" checked={formData.isHouseTrained} onCheckedChange={handleSwitchChange("isHouseTrained")} />
                                    <Label htmlFor="isHouseTrained">House Trained</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="isGoodWithKids" checked={formData.isGoodWithKids} onCheckedChange={handleSwitchChange("isGoodWithKids")} />
                                    <Label htmlFor="isGoodWithKids">Good with Kids</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="isGoodWithOtherDogs" checked={formData.isGoodWithOtherDogs} onCheckedChange={handleSwitchChange("isGoodWithOtherDogs")} />
                                    <Label htmlFor="isGoodWithOtherDogs">Good with Other Dogs</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="isGoodWithCats" checked={formData.isGoodWithCats} onCheckedChange={handleSwitchChange("isGoodWithCats")} />
                                    <Label htmlFor="isGoodWithCats">Good with Cats</Label>
                                </div>
                            </div>
                            <Button type="submit" className="mt-6 w-full">
                                <Plus className="mr-2 h-4 w-4" /> Add Dog
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" asChild className="w-full">
                            <Link to="/admin/dogs">View All Dogs</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}