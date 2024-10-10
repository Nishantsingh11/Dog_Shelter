import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PawPrint, Heart, Users, Home } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-700 mb-4">About Second Chance Paws</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We`&apos;`re on a mission to give every dog a loving home, especially those with special needs or who have been abandoned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <PawPrint className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Our Mission</h3>
              <p className="text-gray-600">To rescue, rehabilitate, and rehome dogs in need, giving them a second chance at happiness.</p>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Our Passion</h3>
              <p className="text-gray-600">We believe every dog deserves love, care, and a forever home, regardless of their past or special needs.</p>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Our Team</h3>
              <p className="text-gray-600">Dedicated volunteers and professionals working tirelessly to make a difference in dogs`&apos;` lives.</p>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Home className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-orange-700 mb-2">Our Shelter</h3>
              <p className="text-gray-600">A safe haven where dogs receive love, medical care, and preparation for their forever homes.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">Our Story</h3>
          <p className="text-gray-700 mb-4">
            Second Chance Paws was founded in 2010 by a group of passionate animal lovers who saw a need for a shelter
            that specializes in caring for dogs with special needs and those who have been abandoned. What started as a
            small operation has grown into a full-fledged shelter with state-of-the-art facilities and a network of
            dedicated foster homes.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we`&apos;`ve rescued, rehabilitated, and rehomed thousands of dogs, giving them the love and care
            they deserve. Our team of veterinarians, behaviorists, and volunteers work tirelessly to ensure that each
            dog receives individualized attention and the best possible chance at finding their forever home.
          </p>
          <p className="text-gray-700">
            We believe that every dog, regardless of their age, breed, or health condition, deserves a loving family.
            Our adoption process is designed to match each dog with the perfect home, ensuring a happy life for both
            the dog and their new family.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">Join Our Mission</h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
            Whether you`&apos;`re looking to adopt, foster, volunteer, or donate, there are many ways to support our cause
            and make a difference in a dog`&apos;`s life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Adopt a Dog</Button>
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100">Volunteer</Button>
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100">Donate</Button>
          </div>
        </div>
      </div>
    </section>
  )
}