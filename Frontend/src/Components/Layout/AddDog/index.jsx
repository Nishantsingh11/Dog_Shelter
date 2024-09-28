import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { addNewDog } from "@/Store/Slice/Dog.sclice"
import { useNavigate } from "react-router-dom"
export default function AddNewDogPage() {
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

    console.log("formdata", formData);
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
        // Here you would typically send the formData to your backend API
        console.log("Form submitted with data:", formData)
        await dispatch(addNewDog(formData)).unwrap()
        // Reset form after submission
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
        navigate("/admin/dogs")
    }



    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || [])



        if (images.length + files.length > 10) {    
            console.log(
                "You can only upload a maximum of 10 images at a time."
            );

            return
        }

        const newImages = files.map(file => ({
            id: URL.createObjectURL(file), // Ensure to give unique IDs for each image for react key.
            file,
            preview: URL.createObjectURL(file)  

        }))

        setImages(prevImages => [...prevImages, ...newImages])
        console.log(files);

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
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild>
                <Link to="/admin/dogs">View All Dogs</Link>
            </Button>

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Add New Dog</CardTitle>
                    <CardDescription>Enter the details of the new dog to add to the shelter database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} onChange={(e) => e.preventDefault()}>
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
                                <Label htmlFor="size" required>Size</Label>
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
                                <Input id="disability" name="disability" value={formData.disability} onChange={handleInputChange} required />
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

                                <Card className="w-full max-w-3xl mx-auto">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold">Image Uploader</h2>
                                            <p className="text-muted-foreground">Upload up to 10 images and see their previews below.</p>

                                            <div className="flex justify-between items-center">
                                                <Button
                                                    type="button"
                                                    onClick={handleUploadClick}
                                                    disabled={images.length >= 10}>
                                                    Upload Images
                                                </Button>
                                                <p className="text-sm text-muted-foreground">
                                                    {images.length}/10 images uploaded
                                                </p>
                                            </div>

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                aria-label="Upload images"
                                            />

                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                                {images.map((image) => (
                                                    <div key={image.id} className="relative group">
                                                        <img
                                                            src={image.preview}
                                                            alt={`Preview of ${image.file.name}`}
                                                            className="w-full h-32 object-cover rounded-md"
                                                        />
                                                        <button
                                                            onClick={() => removeImage(image.id)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            aria-label={`Remove ${image.file.name}`}
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {images.length === 0 && (
                                                <p className="text-center text-muted-foreground mt-8">
                                                    No images uploaded yet. Click the button above to add some!
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>



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
                        <Button type="submit" className="mt-6">
                            <Plus className="mr-2 h-4 w-4" /> Add Dog
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}