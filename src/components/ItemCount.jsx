import { useState } from "react"
import '../styles/itemCount.css'

const ItemCount = ({ initial, inStock, addToCart }) => {
    const [qOfItem, setqOfItem] = useState(initial)
    const increment = () => {
        if (qOfItem < inStock) {
            setqOfItem(qOfItem + 1)
        }
    }
    const decrement = () => {
        if (qOfItem > 1) {
            setqOfItem(qOfItem - 1)
        }
    }
    return (
        <div className='count-container'>
            <div className="num">
                <button className="btn-dec" onClick={decrement}>-</button>
                {qOfItem}
                <button className="btn-inc" onClick={increment}>+</button>
            </div>
            <div>
                <button className='addToCart' onClick={() => addToCart(qOfItem)} disabled={!inStock}>Agregar al carrito</button>
            </div>
        </div>
    )
}
export default ItemCount