import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-amber-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Every Paw Deserves a Loving Home
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    Giving disabled and abandoned dogs a second chance at happiness. Your new best friend is waiting for you.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button>
                                    <Heart className="mr-2 h-4 w-4" />
                                    Adopt Now
                                </Button>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Meet Our Special Friends
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="p-4">
                                    <img
                                        alt="Buddy - a golden retriever with three legs"
                                        className="rounded-lg object-cover w-full h-60"
                                        height="240"
                                        src="/placeholder.svg?height=240&width=360"
                                        width="360"
                                    />
                                    <h3 className="text-xl font-bold mt-2">Buddy</h3>
                                    <p className="text-sm text-gray-500">3-legged Golden Retriever, 5 years old</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <img
                                        alt="Luna - a blind husky"
                                        className="rounded-lg object-cover w-full h-60"
                                        height="240"
                                        src="/placeholder.svg?height=240&width=360"
                                        width="360"
                                    />
                                    <h3 className="text-xl font-bold mt-2">Luna</h3>
                                    <p className="text-sm text-gray-500">Blind Husky, 3 years old</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <img
                                        alt="Max - a senior labrador"
                                        className="rounded-lg object-cover w-full h-60"
                                        height="240"
                                        src="/placeholder.svg?height=240&width=360"
                                        width="360"
                                    />
                                    <h3 className="text-xl font-bold mt-2">Max</h3>
                                    <p className="text-sm text-gray-500">Senior Labrador, 12 years old</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Open Your Heart, Open Your Home
                                </h2>
                                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                                    These loving dogs may have special needs, but they have so much love to give. Adopt a dog and change two lives forever.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <Button className="w-full" size="lg">
                                    Start Adoption Process
                                </Button>
                                <p className="text-xs text-gray-500">
                                    Can &apos t adopt? Consider fostering or donating to support our mission.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}