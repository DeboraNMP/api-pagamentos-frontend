import axios, { AxiosError } from "axios";

const token = localStorage.getItem("token")
const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    }
})

api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.location.replace("/login")
        }
    }
    throw error
})
export default api