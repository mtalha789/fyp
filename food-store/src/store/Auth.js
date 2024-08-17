import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAuthStore = create(
    persist(
        immer((set) => ({
            status:false,
            access_token: null,
            refresh_token: null,
            user: null,
            hydrated: false,
            setHydrated: () => set({hydrated: true}),
            async register(formData) {
              try {
                const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/register`,{
                    body: formData,
                    method: 'POST',
                }))
                .json();
                console.log(response);
                set({user:response?.data})
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
            async login(username, password) {
                try {
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/login`,{
                        body: JSON.stringify({
                            username,
                            password
                        }),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })).json();
                    console.log(response);
                    set({status: true, access_token: response.data.access_token, refresh_token: response.data.refresh_token,});
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
                const response = await (await fetch(`${import.meta.env.VITE_API_URL}/users/logout`,{
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }))
                .json();
                set({status: false,user: null, access_token: null, refresh_token: null,});
        },
        })),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state, error)=>{
                if(!error) state.setHydrated();
            },
        }
    )
)