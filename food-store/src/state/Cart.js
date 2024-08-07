import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCart = create(
  persist(
    immer((set) => ({
      hydrated: false,
      cart: [],
      totalPrice: 0,

      removeFromCart: (itemId) => {
        console.log("Removing item with id:", itemId);
        set((state) => {
          if (state) {
            const itemToRemove = state.cart.find((item) => item.id === itemId);
            if (itemToRemove) {
              state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
            }
            state.cart = state.cart.filter((item) => item.id !== itemId);
          } else {
            console.error("State is undefined in removeFromCart");
          }
        });
      },

      clearCart: () => {
        console.log("Clearing cart");
        set((state) => {
          if (state) {
            state.cart = [];
            state.totalPrice = 0;
          } else {
            console.error("State is undefined in clearCart");
          }
        });
      },

      addToCart: (item) => {
        set((state) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity, 10);
          if (!isNaN(price) && !isNaN(quantity)) {
            state.cart.push(item);
            state.totalPrice += price * quantity;
          }
        });
      },

      incQuantity: (id) => {
        set((state) => {
          const item = state.cart.find((item) => item.id === id);
          if (item) {
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
              item.quantity += 1;
              state.totalPrice += price;
            }
          }
        });
      },

      decQuantity: (id) => {
        set((state) => {
          const itemIndex = state.cart.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            const item = state.cart[itemIndex];
            const price = parseFloat(item.price);
            if (!isNaN(price)) {
              if (item.quantity > 1) {
                item.quantity -= 1;
                state.totalPrice -= price;
              } else {
                state.totalPrice -= price;
                state.cart.splice(itemIndex, 1);
              }
            }
          }
        });
      },

      setHydrated: () => {
        set((state) => {
          state.hydrated = true;
        });
      },
    })),
    {
      name: "cart-storage", // Name of the storage key
      onRehydrateStorage(){
        return (state, error) => {
          if (!error) state?.setHydrated()
        }
      }
    }
  )
);
