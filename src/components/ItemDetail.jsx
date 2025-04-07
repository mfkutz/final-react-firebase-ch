import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'
import { useContext, useState } from 'react'
import { CartContext } from './CartContext'
import '../styles/itemDetail.css'

const ItemDetail = ({ id, product, category, description, price, stock, image }) => {
    const [isCant, setIsCant] = useState(false)
    const { addToCart } = useContext(CartContext)
    const onAdd = (amount) => {
        addToCart({ id, product, amount, price, category, image, stock })
        setIsCant(true)
    }
    return (
        <div className='container'>
            <div>
                <img src={image} alt="product" />
                <div className='container-detail'>
                    <h2>
                        {product}
                    </h2>
                    <h3>
                        {description}
                    </h3>
                    <h4>
                        Precio: ${price}
                    </h4>
                </div>
                <div className='continue-shop'>
                    {
                        !isCant ?
                            <ItemCount initial={1} inStock={stock} addToCart={onAdd} />
                            :
                            <>
                                <Link className='finish-buying' to={'/cart'}>Ir al Carrito</Link>
                                <Link className='keep-buying' to={'/'}>Seguir comprando</Link>
                            </>
                    }
                </div>
            </div>
            <Link to='/' className='back'>
                Ir al Inicio
            </Link>
        </div>
    )
}
export default ItemDetail