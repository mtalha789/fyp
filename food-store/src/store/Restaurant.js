import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from './Auth';



export const useRestaurantStore = create(
    persist(
        immer((set) => ({
            restaurantStatus: false,
            restaurant: null,
            address: null,
            hydrated: false,
            setHydrated: () => set({hydrated: true}),
            // async getRestaurant() {
            //     const response = await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants`)).json();
            //     set({restaurant: response?.data?.restaurant})
            // },
            registerRestaurant: async (restaurantData) => {
                const { accessToken } = useAuthStore()
                try {
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/`,
                        {
                            body: restaurantData,
                            method: 'POST',
                            headers: accessToken && {
                                'Authotization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()

                    set({restaurant: response?.data, restaurantStatus: true})

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
            addRestaurantAddress: async (addressData) => {
                const { accessToken } = useAuthStore()
                try {
                    const restaurantId = useRestaurantStore.getState().restaurant?.id
                    const response = await (await fetch(
                        `${import.meta.env.VITE_API_URL}/restaurants/${restaurantId}/address`,
                        {
                            body: addressData,
                            method: 'POST',
                            headers: accessToken && {
                                'Authotization': `Bearer ${accessToken}`
                            }
                        }
                    )).json()
                    set({address: response?.data})

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
