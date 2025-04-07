import { useContext, useState } from "react"
import { CartContext } from "./CartContext"
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import '../styles/customForm.css'

const CustomForm = () => {
    const { cartList, emptyCart, total } = useContext(CartContext)
    const [id, setId] = useState('')
    const [dataForm, setDataForm] = useState({
        name: '',
        phone: '',
        email: '',
        emailConfirm: ''
    })
    //VALIDATE FORM
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailConfirmError, setEmailConfirmError] = useState('');
    //FUNCTION VALIDATE DATA
    const validateForm = () => {
        let isValid = true;
        if (!dataForm.name) {
            setNameError('Ingrese el nombre');
            isValid = false;
        } else {
            setNameError('');
        }
        if (!dataForm.phone) {
            setPhoneError('Ingrese el teléfono');
            isValid = false;
        } else {
            setPhoneError('');
        }
        if (!dataForm.email) {
            setEmailError('Ingrese el Email');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(dataForm.email)) {
            setEmailError('Ingrese un correo electrónico válido');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!dataForm.emailConfirm) {
            setEmailConfirmError('Confirme su correo electrónico');
            isValid = false;
        } else if (dataForm.emailConfirm !== dataForm.email) {
            setEmailConfirmError('Los correos electrónicos no coinciden');
            isValid = false;
        } else {
            setEmailConfirmError('');
        }
        return isValid;
    }
    const generateOrder = (evt) => {
        evt.preventDefault()
        if (validateForm()) {
            const order = {}
            order.buyer = dataForm
            order.items = cartList.map(({ id, product, amount, price }) => ({ id, product, amount, price }))
            order.total = total
            // insert the command to firebase
            const dbFirestore = getFirestore()
            const ordersCollection = collection(dbFirestore, 'orders')
            addDoc(ordersCollection, order)
                .then(resp => setId(resp.id))
                .catch(err => console.log(err))
                .finally(() => {
                    setTimeout(() => {
                        emptyCart()
                    }, 5000)
                })
        }
    }
    const handleOnChange = (evt) => {
        setDataForm({
            //the spread makes the data persistent, so as not to lose it and not to step on it
            ...dataForm,
            //dynamic field
            [evt.target.name]: evt.target.value
        })
    }
    return (
        <div className="form-container-father">
            <form onSubmit={generateOrder} className="form-container">
                <h3 className="form-title">Formulario de compra</h3>
                <div className="inputs-container">
                    <div className="input-error-container">
                        {nameError && <p className="error-advise">{nameError}</p>}
                        <input
                            type="text"
                            name="name"
                            onChange={handleOnChange}
                            value={dataForm.name}
                            placeholder="Ingrese el nombre"
                            className="input"
                        />
                    </div>
                    <div className="input-error-container">
                        {phoneError && <p className="error-advise">{phoneError}</p>}
                        <input
                            type="text"
                            name="phone"
                            onChange={handleOnChange}
                            value={dataForm.phone}
                            placeholder="Ingrese el teléfono"
                            className="input"
                        />
                    </div>
                    <div className="input-error-container">
                        {emailError && <p className="error-advise">{emailError}</p>}
                        <input
                            type="text"
                            name="email"
                            onChange={handleOnChange}
                            value={dataForm.email}
                            placeholder="Ingrese el Email"
                            className="input"
                        />
                    </div>
                    <div className="input-error-container">
                        {emailConfirmError && <p className="error-advise">{emailConfirmError}</p>}
                        <input
                            type="text"
                            name="emailConfirm"
                            onChange={handleOnChange}
                            value={dataForm.emailConfirm}
                            placeholder="Re-ingrese el Email"
                            className="input"
                        />
                    </div>
                </div>
                {/* action */}
                <div className="action disabled">
                    <div>
                    </div>
                    <div className="cart-action-right">
                        <div className="cart-action-total">
                            <p>Total:</p>
                            <p>${total}</p>
                        </div>
                        <button className="cart-action-buy">Comprar ahora</button>
                        <button className="cart-action-empty" onClick={emptyCart}>Vaciar Carrito</button>
                    </div>
                </div>
                {id.length !== 0 && <h4 className="buy-id">Gracias por tu compra! </h4>}
                {id.length !== 0 && <h4 className="buy-id">El id de la orden es: {id}</h4>}
            </form>
        </div>
    )
}
export default CustomForm