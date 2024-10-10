import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, PawPrint, Search } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { getDogs } from "@/Store/Slice/Dog.sclice"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ClassySpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export default function DogListing() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dogs = useSelector((state) => state.dogs.dogs?.data)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [searchTerm, setSearchTerm] = useState('')
  const dogUnresultImage = "https://img.freepik.com/premium-vector/cartoon-dog-with-red-background-dog-animal-animal-animal-animal-animal-hd-wallpaper_239711-2.jpg"
  const dogsPerPage = 8 // Reduced from 12 to 8 to make cards bigger
  const totalPages = Math.ceil(dogs?.length / dogsPerPage)

  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage

  const filteredDogs = dogs?.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedDogs = [...(filteredDogs || [])].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'breed') return a.breed.localeCompare(b.breed)
    return 0
  })

  const currentDogs = sortedDogs?.slice(indexOfFirstDog, indexOfLastDog)

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  useEffect(() => {
    const fetchAllDogs = async () => {
      await dispatch(getDogs()).unwrap()
      setIsLoading(false)
    }
    fetchAllDogs()
  }, [dispatch])

  const handleDogClick = (id) => {
    navigate("/DogProfile/" + id)
  }

  const handleSort = (value) => {
    setSortBy(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-start p-4">
      <div className="absolute top-14 left-0 w-full h-full bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CNAlKPF2fkOHrSRTrxcATx88vJOMgBMJ5A&s')"}}></div>
      <div className="z-10 w-full max-w-[1400px]"> {/* Increased max-width */}
        <div className="text-center mb-8"> {/* Reduced margin-bottom */}
          <h1 className="text-4xl font-bold mb-2 text-primary">Our Furry Friends</h1>
          <p className="text-xl mb-4 text-gray-700">Find your perfect companion and give them a loving home!</p>
          <div className="flex justify-center space-x-4">
            <PawPrint size={36} className="text-primary animate-bounce" />
            <PawPrint size={36} className="text-primary animate-bounce delay-100" />
            <PawPrint size={36} className="text-primary animate-bounce delay-200" />
          </div>
        </div>

        {isLoading ? (
          <ClassySpinner />
        ) : (
          <>
            <Card className="mb-6"> {/* Reduced margin-bottom */}
              <CardHeader className="pb-2"> {/* Reduced padding-bottom */}
                <CardTitle>Find Your Perfect Match</CardTitle>
                <CardDescription>Use the filters below to find your ideal companion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        id="search"
                        type="text"
                        placeholder="Search dogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Label htmlFor="sort">Sort by</Label>
                    <Select id="sort" value={sortBy} onValueChange={handleSort}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="breed">Breed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"> {/* Reduced gap and margin-bottom */}
              {currentDogs?.map((dog) => (
                <Card key={dog._id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg cursor-pointer" onClick={() => handleDogClick(dog._id)}>
                  <CardHeader className="p-0">
                    <img
                      src={dog.dogImages?.[0] || dogUnresultImage}
                      alt={dog.name}
                      className="w-full h-64 object-cover" // Increased height
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="text-2xl mb-2">{dog.name}</CardTitle> 
                    <CardDescription>
                      <span className="text-base"><strong>Breed:</strong> {dog.breed}</span> 
                      <span className="text-base"><strong>Disability:</strong> {dog.disability || "None"}</span> 
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full text-lg py-6"> {/* Increased button size */}
                      <PawPrint className="mr-2 h-5 w-5" />
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-4">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="text-lg py-6 px-8" // Increased button size
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous
              </Button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="text-lg py-6 px-8" // Increased button size
              >
                Next
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}