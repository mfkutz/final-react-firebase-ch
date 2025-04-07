import { useContext } from "react"
import { CartContext } from "./CartContext"
import { RiDeleteBin5Fill } from "react-icons/ri"

const CartList = () => {
    const { cartList, removeProduct } = useContext(CartContext)
    return (
        <div>
            {cartList.map(prod => (
                <div className="cart-order" key={prod.id}>
                    <img src={prod.image} className="image-cart-order" />
                    <div className="product-cart-title">
                        <small>Producto</small>
                        <h3>{prod.product}</h3>
                    </div>
                    <div className="product-cart-quantity">
                        <small>Cantidad</small>
                        <p>{prod.amount}</p>
                    </div>
                    <div className="product-cart-price">
                        <small>Precio</small>
                        <p>$ {prod.price}</p>
                    </div>
                    <div className="product-cart-subtotal">
                        <small>Subtotal</small>
                        <p>$ {prod.price * prod.amount}</p>
                    </div>
                    <button className="product-cart-delete" onClick={() => removeProduct(prod.id)} ><RiDeleteBin5Fill /></button>
                </div>
            ))}
        </div>
    )
}
export default CartList