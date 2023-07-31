import { useCartStore } from './Cart/useCartStore'

const useRootStore = () => {
    const cartStore = useCartStore()

    return {
        cartStore
    }
}

export default useRootStore