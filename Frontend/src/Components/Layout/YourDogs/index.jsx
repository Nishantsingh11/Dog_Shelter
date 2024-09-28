import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserDogs } from "@/Store/Slice/Dog.sclice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ClassySpinner from "../Common/Loading"
import { useNavigate } from "react-router-dom"
export default function MyDogs() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const dogs = useSelector((state) => state.dogs.dogs)
    useEffect(() => {
        const fetchUserDogs = async () => {
            await dispatch(getUserDogs()).unwrap()
            setIsLoading(false)
        }
        fetchUserDogs()
    }, [dispatch])
    const handleNavigate = (id) => {
        navigate(`/DogProfile/${id}`)
    }

    return (
        isLoading ? < ClassySpinner /> :
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">My Dogs</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dogs ? (dogs.map((dog) => (
                        <Card key={dog._id} className="overflow-hidden cursor-pointer" onClick={() => handleNavigate(dog._id)}>
                            <CardHeader className="p-0">
                                <img
                                    src={dog.dogImages[0]}
                                    alt={dog.name}
                                    className="w-full h-48 object-cover"
                                />
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-xl mb-2">{dog.name}</CardTitle>
                                <p className="text-gray-600">Breed: {dog.breed}</p>
                            </CardContent>
                        </Card>
                    ))) : (
                        <div>not found</div>
                    )}
                </div>

                {dogs.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">You dont have any dogs yet.</p>
                )}
            </div>
    )
}