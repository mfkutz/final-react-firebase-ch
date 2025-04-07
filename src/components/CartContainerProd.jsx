import CustomForm from "./CustomForm"
import CartList from "./CartList"
import '../styles/cartContainerProd.css'

const CartContainerProd = () => {    
    return (
            <div className="container-cart">
                <CartList />
                <CustomForm />
            </div>
    )
}
export default CartContainerProd