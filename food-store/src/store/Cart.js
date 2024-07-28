import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCartStore = create(
    persist(
        immer((set) => ({
            cart: [],
            hydrated: false,
            setHydrated: () => set({hydrated: true}),
            addCart: (productId, quantity) => set({cart: [...cart, {productId, quantity}]}),
            removeCart: (productId) => set({cart: cart.filter((item) => item.productId !== productId)}),
            clearCart: () => set({cart: []}),
        })),
        {
            name: "cart",
            onRehydrateStorage: () => (state,error) => {
                if(!error) state.setHydrated();
            }
        }
    )
)