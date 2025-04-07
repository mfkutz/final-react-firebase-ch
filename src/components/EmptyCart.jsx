import { Link } from 'react-router-dom'
import cartEmpty from '../img/emptycart.png'
import '../styles/emptyCart.css'

const EmptyCart = () => {
  return (
    <div className='empty-container'>
      <img src={cartEmpty} alt="Cart" />
      <div className='container-button'>
        <Link to='/' className='back'>
          Ir al Inicio
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart