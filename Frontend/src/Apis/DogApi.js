import makeApiCall from "./makeApiCalls";
const AddNewDog = (data) => makeApiCall("/dog/add-dog", "POST", data)
const GetDogs = () => makeApiCall("/dog/get-dogs", "GET")
const GetDogById = (id) => makeApiCall(`/dog/get-dog/${id}`, "GET")
const UpdateDog = (id, data) => makeApiCall(`/dog/update-dog/${id}`, "PATCH", data)
const DeleteDog = (id) => makeApiCall(`/dog/delete/${id}`, "DELETE")
const UpdateAdoptedStatus = (id, data) => makeApiCall(`/dog/update-adopted-status/${id}`, "PATCH", data)
const GetUserDogs = () => makeApiCall("/dog/get-user-dogs", "GET")
console.log(GetUserDogs);

export { AddNewDog, GetDogs, GetDogById, UpdateDog, DeleteDog,UpdateAdoptedStatus,GetUserDogs }
