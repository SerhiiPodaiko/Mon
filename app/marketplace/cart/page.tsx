import Cart from '@components/Cart/Cart'
import { Footer, Header } from '@components/Layout'
import Work from '@components/SingleMarketplace/Work/Work'

import CartProvider from '@context/Cart/CartContext'

const CartPage = () => {
  return (
    <section>
      <Header dark={true} />
      <main>
        <CartProvider>
          <Cart />
        </CartProvider>
        <Work />
      </main>
      <Footer />
    </section>
  )
}

export default CartPage
