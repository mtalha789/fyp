import { useMutation, QueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/Auth"

const queryClient = new QueryClient()
export const toggleProductAvailability = async () =>{
    return useMutation({
        mutationFn: (id) => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/${id}/toggle-unavailable`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore(state=> state.access_token)}`
            }
        })
        .then((res) => res.json())
    },
    mutationKey: ['menu',id],
    onSuccess: () => queryClient.invalidateQueries(['menu',id]),
    })
}

export const deleteProduct = async () =>{
    return useMutation({
        mutationFn: (id) => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useAuthStore(state => state.access_token)}`
            }
        })
        .then((res) => res.json())
    },
    mutationKey: ['menu'],
    onSuccess: () => queryClient.invalidateQueries(['menu']),
    })
}

export const addProduct = async () =>{
    return useMutation({
        mutationFn: (postData) => {
        return fetch(`${import.meta.env.VITE_API_URL}/products`, {
            method:'POST',
            body: postData,
            headers: {
                'Authorization': `Bearer ${useAuthStore(state => state.access_token)}`
            }
        })
        .then((res) => res.json())
    },
    mutationKey: ['menu'],
    onSuccess: () => queryClient.invalidateQueries(['menu']),
    })
}

export const updateProduct = () =>{
    return useMutation({
        mutationFn: (updateData) => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/${updateData.id}`, {
            method:'PUT',
            body: updateData,
            headers: {
                'Authorization': `Bearer ${useAuthStore(state => state.access_token)}`
            }
        })
        .then((res) => res.json())
    },
    mutationKey: ['menu',updateData.id],
    onSuccess: () => queryClient.invalidateQueries(['menu',updateData.id]),
    })
}

export const updateProductImage = () =>{
    return useMutation({
        mutationFn: (updateData) => {
        return fetch(`${import.meta.env.VITE_API_URL}/products/${updateData.id}/product-image`, {
            method:'PUT',
            body: updateData.fileData,
            headers: {
                'Authorization': `Bearer ${useAuthStore(state => state.access_token)}`
            }
        })
        .then((res) => res.json())
    },
    mutationKey: ['menu',updateData.id],
    onSuccess: () => queryClient.invalidateQueries(['menu',updateData.id]),
    })
}