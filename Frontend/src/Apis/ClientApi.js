import axios from "axios"

const ClientApi = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})
ClientApi.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        window.location.href = "/admin/refreshToken"
    }
    console.error("API Error:", error.response?.data?.message)
    return Promise.reject(error)
}
)

export default ClientApi