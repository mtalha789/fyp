import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAuthStore = create(
    persist(
        immer((set, get) => ({
            status: false,
            accessToken: null,
            refreshToken: null,
            user: null,
            hydrated: false,
            setHydrated: () => set({ hydrated: true }),
            async register(formData) {
                try {
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
                        body: formData,
                        method: 'POST',
                    }))
                        .json();
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
            async login(username, password, getUserRestaurants) {
                try {
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                        body: JSON.stringify({
                            username,
                            password
                        }),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })).json();
                    set({ status: true, accessToken: response.data?.accessToken, refreshToken: response.data?.refreshToken, user: response.data?.user });

                    if (response.data?.user?.role?.toLowerCase() == 'seller') {
                        
                        getUserRestaurants(response.data?.accessToken);
                    }
                    
                    return {
                        success: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        success: false,
                        error: error
                    }
                }
            },
            async logout() {
                try {
                    const accessToken = get().accessToken;
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }))
                        .json();
                    set({ status: false, user: null, accessToken: null, refreshToken: null, });
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
            async getCurrentUser(accessToken) {
                try {
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }))
                        .json();
                    console.log(response);
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
            name: 'auth-storage',
            onRehydrateStorage: () => (state, error) => {
                if (!error) state.setHydrated();
            },
        }
    )
)