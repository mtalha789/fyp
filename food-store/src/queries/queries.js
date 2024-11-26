import { useQuery } from "@tanstack/react-query"

export const useCategories = () => {  
    return useQuery({
        queryKey:['categories'],
        queryFn:  () => {
        const response = fetch(`${import.meta.env.VITE_API_URL}/categories`).then(response => response.json()).then(res => {
            console.log('res',res.data.categories);
            
            return res.data.categories
        })
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
export const useRestaurantMenu =(id) => {
    return useQuery({
        queryKey: ['restaurant-menu'],
        queryFn: async () => {
            const response = await( fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/menu`).then(res => res.json()))
            console.log('ress',response);
            
            return response.data.restaurantMenu
        }
    })
}

export const useRestaurantSellerMenu = (id, accessToken) => {
    return useQuery({
        queryKey: ['restaurant-seller-menu', id],
        queryFn: async() => {
            const response = await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/seller-menu`,{headers: {'Authorization': `Bearer ${accessToken}`}})).json()
            console.log('ress',response);
            
            return response.data.restaurantMenu
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
export const useRestaurantSalesReport = (id, accessToken) => {
    return useQuery({
        queryKey: ['restaurant-sales', id],
        queryFn: async() => {
            const response =  await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/sales`,{
                headers: {'Authorization': `Bearer ${accessToken}`}
            })).json()

            if(response?.data && response.data?.success){
                return response.data
            }
        }
    })
}

export const useRestaurantOrders = (id, accessToken) => {
    return useQuery({
        queryKey: ['restaurant-orders', id],
        queryFn: async () => {
            const response =  await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}/orders`,{headers: {'Authorization': `Bearer ${accessToken}`} })).json()
            return response.data.orders
        }
    })
}

export const useRestaurantTimeslots = (id) => {
    return useQuery({
        queryKey: ['restaurant-timeslots', id],
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

export const useUser = (adminToken) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
        const res= await ( (await fetch(`${import.meta.env.VITE_API_URL}/admin/users`,{headers: {'AdminAuthorization': `Bearer ${adminToken}`} }))).json()
        console.log('res',res);
        
            return res.data.users
        }
    })
}

export const useUnapprovedRestaurants = (adminToken) => {
    return useQuery({
        queryKey: ['unapproved-restaurants'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/restaurants/unapproved`, {
                headers: { 'AdminAuthorization': `Bearer ${adminToken}` },
            });
            const result = await response.json();

            console.log('ress',result);
                          
            return result.data.unApprovedRestaurants;
        }
    })
}

export const useRiders = (adminToken) => {
    return useQuery({
        queryKey: ['riders'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/riders`, {
                headers: { 'AdminAuthorization': `Bearer ${adminToken}` },
            });
            const result = await response.json();
            
            return result.data.riders;
        }
    })
}

// export const useOrders = (adminToken) => {
//     return useQuery({
//         queryKey: ['orders'],
//         queryFn: () => {
//         return fetch(`${import.meta.env.VITE_API_URL}/admin/orders`,{headers: {'AdminAuthorization': `Bearer ${adminToken}`} }).then(response =>response.json())
//         }
//     })
// }

export const useOrders = (adminToken) => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/orders`, {
                headers: { 'AdminAuthorization': `Bearer ${adminToken}` },
            });
            const result = await response.json();
            
            return result.data.orders;
        }        
    });
};


export default useCategories