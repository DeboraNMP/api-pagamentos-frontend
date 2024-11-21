import { storageGetItem } from "./localStorage";

export function formatHeaderRequest() {
    const token = storageGetItem("token")
    const headers = { Authorization: `Bearer ${token}` }
    return headers
}