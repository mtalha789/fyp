import { useQuery } from "@tanstack/react-query"

const useCategories = () => {  
    return useQuery({
        queryKey:['categories'],
        queryFn: () => {
        return fetch(`${import.meta.env.VITE_API_URL}/categories`).then(response => response.json())
        }
    })
}

export const useMenu =  () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: () => {
        return fetch(`${import.meta.env.VITE_API_URL}/products`).then(response => response.json())
        }
    })
}

export const useMenuItem = (id) => {
    return useQuery({
        queryKey: ['menu', id],
        queryFn: () => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`).then(response => response.json())
        }
    })
}

export default useCategories