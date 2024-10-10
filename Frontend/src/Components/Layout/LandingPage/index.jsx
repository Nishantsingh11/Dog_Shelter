import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Heart, PawPrint, Gift, Home, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function EnhancedLandingPage() {
    const dogUnresultImage = "https://img.freepik.com/premium-vector/cartoon-dog-with-red-background-dog-animal-animal-animal-animal-animal-hd-wallpaper_239711-2.jpg"
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
            <div className="absolute top-52 left-0 w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/newspress-collage-23885173-1694272059876.jpg?w=620')" }}></div>
            <main className="flex-1 relative z-10">
                <section className="w-full py-20 md:py-32 lg:py-48 bg-cover bg-center relative" style={{ backgroundImage: "url('https://www.thesun.ie/wp-content/uploads/sites/3/2023/09/newspress-collage-23885173-1694272059876.jpg?w=620')" }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                                    Every Paw Deserves a Loving Home
                                </h1>
                                <p className="mx-auto max-w-[700px] text-xl text-gray-200 md:text-2xl">
                                    Giving disabled and abandoned dogs a second chance at happiness. Your new best friend is waiting for you.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                                    <Heart className="mr-2 h-5 w-5" />
                                    <Link to="/dogsList">
                                        Adopt Now
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="text-black border-white hover:bg-black  hover:text-white">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-20 md:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary">
                            Meet Our Special Friends
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: "Buddy", description: "3-legged Golden Retriever, 5 years old", image: "" },
                                { name: "Luna", description: "Blind Husky, 3 years old", image: "" },
                                { name: "Max", description: "Senior Labrador, 12 years old", image: "" },
                            ].map((dog, index) => (
                                <Card key={index} className="overflow-hidden transition-transform duration-200 hover:scale-105">
                                    <CardContent className="p-0">
                                        <img
                                            alt={`${dog.name} - ${dog.description}`}
                                            className="w-full h-64 object-cover"
                                            height="256"
                                            src={dog.image || dogUnresultImage}
                                            width="384"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold text-primary">{dog.name}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{dog.description}</p>
                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                                                Meet {dog.name}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-20 md:py-32 bg-white/50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
                            <div className="md:w-1/2 space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                                    Open Your Heart, Open Your Home
                                </h2>
                                <p className="text-xl text-gray-700">
                                    These loving dogs may have special needs, but they have so much love to give. Adopt a dog and change two lives forever.
                                </p>
                                <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white">
                                    Start Adoption Process
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <Home className="h-12 w-12 text-primary mb-4" />
                                        <CardTitle>Foster</CardTitle>
                                        <CardDescription>Provide a temporary loving home</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <Gift className="h-12 w-12 text-primary mb-4" />
                                        <CardTitle>Donate</CardTitle>
                                        <CardDescription>Support our mission financially</CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="col-span-2">
                                    <CardHeader>
                                        <PawPrint className="h-12 w-12 text-primary mb-4" />
                                        <CardTitle>Volunteer</CardTitle>
                                        <CardDescription>Help us care for these special dogs</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div className="flex justify-center space-x-4 py-8">
                <PawPrint size={48} className="text-primary animate-bounce" />
                <PawPrint size={48} className="text-primary animate-bounce delay-100" />
                <PawPrint size={48} className="text-primary animate-bounce delay-200" />
            </div>
        </div>
    )
}