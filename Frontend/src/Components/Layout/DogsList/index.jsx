"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { getDogs } from "@/Store/Slice/Dog.sclice"
import { useNavigate } from "react-router-dom"
import ClassySpinner from "../Common/Loading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Label } from "@radix-ui/react-label"

export default function DogListing() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dogs = useSelector((state) => state.dogs.dogs?.data)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const dogsPerPage = 8
  const totalPages = Math.ceil(dogs?.length / dogsPerPage)

  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = dogs?.slice(indexOfFirstDog, indexOfLastDog)

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  useEffect(() => {
    const fetchAllDogs = async () => {
      await dispatch(getDogs()).unwrap()
      setIsLoading(false)
    }
    fetchAllDogs()
  }, [dispatch])
  console.log(dogs);



  const handleDogClick = (id) => {
    navigate("/DogProfile/" + id)
  }
  const handleSort = (value) => {
    console.log(value);
    
  }
  return (
    <div className="container mx-auto px-4 py-8">


      {isLoading ? <ClassySpinner /> : (
        <>

          <div className=" 
          flex 
          items-center
          justify-between
          ">
            <h2 className="text-3xl font-bold mb-6">Our Special Friends</h2>
            {/*  shorting and filter */}

            <div className=" flex justify-between">

            <div className="w-full sm:w-auto">
              <Label htmlFor="sort">Sort by</Label>
              <Select  onValueChange={handleSort}>
                <SelectTrigger id="sort" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

              <Label htmlFor="size" required>Size</Label>
              <Select name="size" required>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentDogs?.map((dog) => (
              <Card key={dog._id} className="flex flex-col" onClick={() => handleDogClick(dog._id)}>
                <CardHeader>
                  <img


                    src={
                      dog && dog.dogImages ? dog?.dogImages[0] : "https://via.placeholder.com/300x200"
                    }

                    alt={dog.name}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle>{dog.name}</CardTitle>
                  <CardDescription>{dog.description}</CardDescription>
                  <p className="mt-2"><strong>Disability:</strong> {dog.disability || "None"}</p>
                  <p><strong>Breed:</strong> {dog.breed}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}