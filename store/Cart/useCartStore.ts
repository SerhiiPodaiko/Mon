import { create } from 'zustand'

export type UseCartStore = {
    cartData: any
    setCartData: (data: any) => void
    step: number
    changeStep: (indexStep: number) => void
}

export const useCartStore = create<UseCartStore>(set => ({
    cartData: [],
    setCartData: (data: any) => set({ cartData: data }),
    step: 1,
    changeStep: (indexStep: number) => set({ step: indexStep }),
}))