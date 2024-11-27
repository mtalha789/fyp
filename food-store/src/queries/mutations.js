import { useMutation, QueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/Auth"

const queryClient = new QueryClient()
export const toggleProductAvailability = async (id, accessToken) => {
    return useMutation({
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/products/${id}/toggle-unavailable`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => res.json())
        },
        mutationKey: ['menu', id],
        onSuccess: () => queryClient.invalidateQueries(['menu', id]),
    })
}

export const deleteProduct = async (id, accessToken) => {
    return useMutation({
        mutationFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => res.json())
        },
        mutationKey: ['menu', id],
        onSuccess: () => queryClient.invalidateQueries(['menu', id]),
    })
}

export const addProduct = () => {
    return useMutation({
        mutationFn: (postData, accessToken) => {
            return fetch(`${import.meta.env.VITE_API_URL}/products`, {
                method: 'POST',
                body: postData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => res.json())
        },
        mutationKey: ['menu'],
        onSuccess: () => queryClient.invalidateQueries(['menu']),
    })
}

export const updateProduct = (id) => {
    return useMutation({
        mutationFn: (updateData, accessToken) => {
            return fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
        },
        mutationKey: ['menu', id],
        onSuccess: () => queryClient.invalidateQueries(['menu', id]),
    })
}

export const updateProductImage = (id) => {
    return useMutation({
        mutationFn: (fileData, accessToken) => {
            return fetch(`${import.meta.env.VITE_API_URL}/products/${id}/product-image`, {
                method: 'PUT',
                body: fileData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => res.json())
        },
        mutationKey: ['menu', id],
        onSuccess: () => queryClient.invalidateQueries(['menu', id]),
    })
}

export const addCategory = () => {
    return useMutation({
        mutationFn: (categoryData, accessToken) => {
            fetch(`${import.meta.env.VITE_API_URL}/categories`, {
                method: 'POST',
                body: JSON.stringify(categoryData),
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json()).then(res => {
                    console.log('res',res);
                    
                    return res.success
                    
                })
        },
        mutationKey: ['menu'],
        onSuccess: () => queryClient.invalidateQueries(['menu']),
    })
}

export const updateOrder = (restaurantId) => {
    return useMutation({
        mutationFn: (id, orderStatus, accessToken) => {
            return fetch(`${import.meta.env.VITE_API_URL}/orders/${id}/accept`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderStatus })
            })
                .then((res) => res.json())
        },
        mutationKey: ['restaurant-orders', restaurantId],
        onSuccess: () => queryClient.invalidateQueries(['restaurant-orders', restaurantId])
    })
}

export const deleteUserAccount = () => {
    return useMutation({
        mutationFn: (id, adminToken) => {
            return fetch(`${import.meta.env.VITE_API_URL}/admin/user/${id}`, {
                headers: { 'Authorization': `Bearer ${adminToken}` }, method: 'DELETE'
            }).then(response => response.json())

        },
        mutationKey: ['users'],
        onSuccess: () => queryClient.invalidateQueries(['users'])
    })
}
export const approveRestaurant = (adminToken) => {
    return useMutation({
        mutationFn: (id ) => {            
            fetch(`${import.meta.env.VITE_API_URL}/admin/restaurant/${id}/approve`, {
                headers: { 'AdminAuthorization': `Bearer ${adminToken}` },
                method: 'PUT'
            }).then(response => response.json())
            .then(res => {
                console.log('res',res.data.success)
                return res.data && res.data
            })
        },
        mutationKey: ['unapproved-restaurants'],
        onSuccess: () => queryClient.invalidateQueries(['unapproved-restaurants'])
    })
}

export const rejectRestaurant = () => {
    return useMutation({
        mutationFn: (id, adminToken) => {
            console.log(id, adminToken);
            
            fetch(`${import.meta.env.VITE_API_URL}/admin/restaurant/${id}/reject`, {
                headers: { 'AdminAuthorization': `Bearer ${adminToken}` },
                method: 'PUT'
            }).then(response => response.json())
            then(res => {
                console.log('res',res)
                return res.data && res.data
            })
        },
        mutationKey: ['unapproved-restaurants'],
        onSuccess: () => queryClient.invalidateQueries(['unapproved-restaurants'])
    })
}
