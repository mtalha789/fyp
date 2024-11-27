import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useAuthStore } from "./Auth";

export const useRestaurantStore = create(
  persist(
    immer((set) => ({
      businessStatus: false,
      restaurants: [],
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      // async getRestaurant() {
      //     const response = await (await fetch(`${import.meta.env.VITE_API_URL}/restaurants`)).json();
      //     set({restaurant: response?.data?.restaurant})
      // },
      registerRestaurant: async (restaurantData, accessToken) => {
        try {
          const response = await (
            await fetch(`${import.meta.env.VITE_API_URL}/restaurants/`, {
              body: restaurantData,
              method: "POST",
              headers: accessToken && {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          ).json();
          if (response?.data && response.data?.success) {
            set({
              restaurants: useRestaurantStore
                ?.getState()
                ?.restaurants.concat(response?.data.restaurant),
              businessStatus: true,
            });
          } else {
            throw new Error(response.message);
          }

          return {
            success: true,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      },
      addRestaurantAddress: async (addressData, accessToken, restaurantId, getRestaurants) => {
        try {
          console.log(JSON.stringify(addressData));
          const response = await (
            await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/restaurants/${restaurantId}/address`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressData),
              }
            )
          ).json();
          if (response?.data && response.data?.success) {
            getRestaurants(accessToken);
          } else {
            throw new Error(response.message);
          }

          return {
            success: true,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      },
      deleteRestaurant: async (id, accessToken) => {
        try {
          const response = await (
            await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}`, {
              method: "DELETE",
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
            })
          ).json();
          if (response?.data && response.data?.success) {
            useRestaurantStore.getState().getUserRestaurants(accessToken)
          } else {
            throw new Error(response.message);
          }

          return {
            success: true,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      },
      editRestaurant: async (restaurantData, id, accessToken) => {
        try {
          const response = await (
            await fetch(`${import.meta.env.VITE_API_URL}/restaurants/${id}`, {
              body: JSON.stringify(restaurantData),
              method: "PUT",
              headers: accessToken && {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            })
          ).json();
          if (response?.data && response.data?.success) {
            useRestaurantStore.getState().getUserRestaurants()
          } else {
            throw new Error(response.message);
          }

          return {
            success: true,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      },
      resetAccount: () => set({ businessStatus: false, restaurants: [] }),
      getUserRestaurants: async (accessToken) => {
        try {
          const response = await (
            await fetch(`${import.meta.env.VITE_API_URL}/users/restaurants`, {
              headers: accessToken && {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          ).json();

          if (response?.data && response.data?.success) {
            set({
              restaurants: response?.data?.restaurants,
              businessStatus: true,
            });
          } else {
            throw new Error(response.message);
          }
          return {
            success: true,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            error,
          };
        }
      },
    })),
    {
      name: "restaurant",
      onRehydrateStorage: () => (state, error) => {
        if (!error) state.setHydrated();
      },
    }
  )
);
