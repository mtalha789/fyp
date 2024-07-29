// import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/Auth"


export const getMenu = async () => {
    try {
        const menu = await fetch("http://localhost:3000/api/menu")
        return menu.json()
    } catch (error) {
        
    }
}

export const toggleAvailability = async (id) =>{
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}/toggle-unavailable`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore.getState().access_token}`
            }
        })
    } catch (error) {
        
    }
}