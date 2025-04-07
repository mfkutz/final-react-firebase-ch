import { useContext } from 'react'
import { CartContext } from "./CartContext"
import cart from '../assets/images/icon-cart.svg'

const CartWidget = () => {
    const { getTotalProducts } = useContext(CartContext)
    return (
        <div>
            <img src={cart} alt="cart" />
            <span>
                {getTotalProducts() !== 0 && getTotalProducts()}
            </span>
        </div>
    )
}
export default CartWidget