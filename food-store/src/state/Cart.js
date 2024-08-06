import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCart = create(
  persist(
    //for storing data into local storage
    immer((set) => ({
      // immer for using the methods of it
      hydrated: false,
      // isOpen: false,
      cart: [],
      // toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set(() => ({ cart: [] })),
      setHydrated:()=>set({hydrated:true})
    })),
    {
      name: "cart",
      onRehydrateStorage: (state, error) => {
        // for getting data from local storage
        if (!error) state.setHydrated();
      },
    }
  )
);
