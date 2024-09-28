import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BriefcaseMedical, Clock, DollarSign, Heart, Info, MapPin, Utensils, } from "lucide-react"
import { ChevronLeft, ChevronRight, PawPrint, Cake, Scale, Ruler } from "lucide-react"

import { useSelector, useDispatch } from "react-redux"
import { getDogById } from "@/Store/Slice/Dog.sclice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import  ClassySpinner  from "@/Components/Layout/Common/Loading"
// import { Link } from "react-router-dom"


export default function SingleDogPage() {
    const { id } = useParams()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === dog.dogImages.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? dog?.dogImages?.length - 1 : prevIndex - 1
        )
    }

    const handleAdopt = () => {
        console.log({
            title: "Adoption Request Sent",
            description: `Thank you for your interest in adopting ${dog.name}. We'll contact you soon with more information.`,
        })
    }

    console.log("id from the dog list ", id);

    const dispatch = useDispatch()
    const dog = useSelector((state) => state.dogs.dogs?.data)
    console.log("dog from the dog list ", dog);
    useEffect(() => {
        const FetchDogProfile = async () => {

            await dispatch(getDogById(id)).unwrap()
            setIsLoading(false)
        }
        FetchDogProfile()
    }, [dispatch, id])
    return (




        <div className="min-h-screen flex flex-col bg-background text-foreground">



            {
                isLoading ? <ClassySpinner /> :

                    (
                        <>

                            <header className="bg-primary text-primary-foreground p-4">
                                <h1 className="text-3xl font-bold">{dog?.name}s Profile</h1>
                            </header>

                            <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                                <section className="w-full lg:w-1/2 relative">
                                    <img
                                        src={dog?.dogImages[currentImageIndex]}
                                        alt={`${dog?.name} - Image ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-1/2 left-4 transform -translate-y-1/2"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {dog?.dogImages?.map((_, index) => (
                                            <Button
                                                key={index}
                                                variant={index === currentImageIndex ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentImageIndex(index)}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </div>
                                </section>

                                <section className="w-full lg:w-1/2 p-6 overflow-y-auto">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-3xl font-bold">{dog?.name}</h2>
                                                <p className="text-muted-foreground">{dog?.breed}</p>
                                            </div>
                                            <Badge variant="secondary" className="text-lg">
                                                {dog?.gender}
                                            </Badge>
                                        </div>

                                        <Tabs defaultValue="details" className="w-full">
                                            <TabsList className="grid w-full grid-cols-4">
                                                <TabsTrigger value="details">Details</TabsTrigger>
                                                <TabsTrigger value="care">Care</TabsTrigger>
                                                <TabsTrigger value="temperament">Temperament</TabsTrigger>
                                                <TabsTrigger value="medical">Medical</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="details" className="space-y-4">
                                                <Card>
                                                    <CardContent className="p-4 grid grid-cols-2 gap-4">
                                                        <div className="flex items-center space-x-2">
                                                            <PawPrint className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Breed</h3>
                                                                <p>{dog?.breed}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Cake className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Age</h3>
                                                                <p>{dog?.age} years</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Scale className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Weight</h3>
                                                                <p>{dog?.weight} kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Ruler className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Height</h3>
                                                                <p>{dog?.height} cm</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <Info className="h-5 w-5 mr-2" /> Description
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.description}</p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardContent className="p-4 space-y-4">
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Location</h3>
                                                                <p>{dog?.location}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Clock className="h-5 w-5" />
                                                            <div>
                                                                <h3 className="font-semibold">Arrival Date</h3>
                                                                <p>{dog?.arrivalDate}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="care" className="space-y-4">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <Utensils className="h-5 w-5 mr-2" /> Dietary Needs
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.dietaryNeeds}</p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <Award className="h-5 w-5 mr-2" /> Training Level
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.trainingLevel}</p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <PawPrint className="h-5 w-5 mr-2" /> Exercise Needs
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.exerciseNeeds}</p>
                                                    </CardContent>
                                                </Card>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <Ruler className="h-5 w-5 mr-2" /> Grooming Needs
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.groomingNeeds}</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="temperament">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Temperament</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="flex flex-wrap gap-2">
                                                            {dog?.temperament?.map((trait, index) => (
                                                                <Badge key={index} variant="outline">{trait}</Badge>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="medical">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center">
                                                            <BriefcaseMedical className="h-5 w-5 mr-2" /> Medical Information
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{dog?.medicalInfo}</p>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>

                                        <Card>
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <DollarSign className="h-5 w-5" />
                                                    <div>
                                                        <h3 className="font-semibold">Adoption Fee</h3>
                                                        <p>${dog?.adoptionFee}</p>
                                                    </div>
                                                </div>
                                                <Button onClick={handleAdopt} size="lg">
                                                    <Heart className="mr-2 h-4 w-4" /> Adopt {dog?.name}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </section>
                            </main>
                        </>
                    )
            }
        </div>


    )

}