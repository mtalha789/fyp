import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const useAdminStore = create(
    persist(
        immer((set) => ({
            hydrated: false,
            adminStatus: false,
            adminToken: null,
            authenticateAdmin: async (username, password) => {
                try {
                    const response = await (await fetch(`${import.meta.env.VITE_API_URL}/admin/auth`,{
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
                    set({adminStatus: true, adminToken: response.data.access_token,});
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
            setHydrated: () => set({hydrated: true}),
        })),
        { 
            name: 'admin-storage', 
            onRehydrateStorage: () => (error,state) => {
                if(!error) state.setHydrated()
            }
        },
    ),
)