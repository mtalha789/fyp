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

export const useRestaurants = () => {
    return useQuery({
        queryKey: ['restaurant'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants`).then(res => res.json())
        }
    })
}
export const useRestaurant = (id) => {
    return useQuery({
        queryKey: ['restaurant', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}`).then(res => res.json())
        }
    })
}
export const useRestaurantMenu = (id) => {
    return useQuery({
        queryKey: ['restaurant-menu', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/menu`).then(res => res.json())
        }
    })
}
export const useRestaurantReviews = (id) => {
    return useQuery({
        queryKey: ['restaurant-reviews', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/reviews`).then(res => res.json())
        }
    })
}
export const useRestaurantSalesReport = (id) => {
    return useQuery({
        queryKey: ['restaurant-sales', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/sales`).then(res => res.json())
        }
    })
}

export const useRestaurantOrders = (id) => {
    return useQuery({
        queryKey: ['restaurant-orders', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/orders`).then(res => res.json())
        }
    })
}

export const useRestaurantTimeslots = (id) => {
    return useQuery({
        queryKey: ['restaurant-orders', id],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/timeslots`).then(res => res.json())
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