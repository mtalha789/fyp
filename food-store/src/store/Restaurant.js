import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from './Auth';



export const useRestaurantStore = create(
    persist(
        immer((set) => ({
            businessStatus: false,
            restaurants: [],
            hydrated: false,
            setHydrated: () => set({hydrated: true}),
            // async getRestaurant() {
            //     const response = await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants`)).json();
            //     set({restaurant: response?.data?.restaurant})
            // },
            registerRestaurant: async (restaurantData, accessToken) => {
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/`,
                        {
                            body: restaurantData,
                            method: 'POST',
                            headers: accessToken && {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    set({restaurants: useRestaurantStore?.getState()?.restaurants.concat(response?.data.restaurant), businessStatus: true})

                    return {
                        success: true,
                        error: null
                    }
    
                } catch (error) {
                    return {
                        success: false,
                        error
                    }
                }
            },
            addRestaurantAddress: async (addressData, accessToken, restaurantId) => {
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/${restaurantId}/address`,
                        {
                            body: JSON.stringify(addressData),
                            method: 'POST',
                            headers: accessToken && {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    set({restaurants: useRestaurantStore?.getState()?.restaurants.map((r) => r.id === restaurantId ? (
                        r.address ? r.address?.push(response?.data?.updatedRestaurant) : r.address = [response?.data?.updatedRestaurant]
                    ) : r)})
                    
                    return {
                        success: true,
                        error: null
                    }
    
                } catch (error) {
                    return {
                        success: false,
                        error
                    }
                }
            },
            deleteRestaurant: async (id, accessToken) => {
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/${id}`,
                        {
                            method: 'DELETE',
                            headers: accessToken && {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    set({restsurants: useRestaurantStore?.getState()?.restaurants.filter((r) => r.id !== id)})

                    return {
                        success: true,

                    }
                }catch (error) {
                    return {
                        success: false,
                        error
                    }
                }    
            },
            editRestaurant: async (restaurantData, id, accessToken) => {
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/${id}`,
                        {
                            body: JSON.stringify(restaurantData),
                            method: 'PUT',
                            headers: accessToken && {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    set({restaurants: useRestaurantStore?.getState()?.restaurants.map((r) => r.id === id ? response?.data : r)})

                    return {
                        success: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        success: false,
                        error
                    }
                }
            },
            resetAccount: () => set({businessStatus: false, restaurants: []}),
            getUserRestaurants: async (accessToken) => {
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/users/restaurants`,
                        {
                            headers: accessToken && {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    if(response?.data?.restaurants) set({restaurants: response?.data?.restaurants, businessStatus: true})

                    return {
                        success: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        success: false,
                        error
                    }
                }
            }
        })),
        {
            name: 'restaurant',
            onRehydrateStorage: () => (state, error)=>{
                if(!error) state.setHydrated();
            }

        }
    )
);
