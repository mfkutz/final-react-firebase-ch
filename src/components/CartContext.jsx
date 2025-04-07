import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    //states and global functions
    const [cartList, setCartList] = useState([])
    const [total, setTotal] = useState(0)
    //total purchase price
    function updateTotal() {
        const addTotal = cartList.reduce((acc, prod) => acc + prod.price * prod.amount, 0)
        setTotal(addTotal)
    }
    //update the total value on each cart change
    useEffect(() => {
        updateTotal()
    }, [cartList])
    //add to cart
    const addToCart = (newProduct) => {
        const existingProduct = cartList.find(product => product.id === newProduct.id)
        if (existingProduct) {
            const updatedCart = cartList.map(product => {
                if (product.id === existingProduct.id) {
                    return {
                        ...product,
                        amount: product.amount + newProduct.amount
                    }
                }
                return product
            })
            setCartList(updatedCart)
        } else {
            setCartList([...cartList, newProduct])
        }
    }
    //emptyCart
    const emptyCart = () => {
        setCartList([])
    }
    //remove by item
    function removeProduct(id) {
        const newCartList = cartList.filter((product) => product.id !== id)
        setCartList(newCartList)
    }
    //total amount of products
    function getTotalProducts() {
        const totalProducts = cartList.reduce((acc, prod) => acc + prod.amount, 0)
        return totalProducts
    }
    return (
        <CartContext.Provider value={{
            //here we declare the states and functions that we are going to use
            cartList,
            total,
            addToCart,
            emptyCart,
            updateTotal,
            removeProduct,
            getTotalProducts
        }}>
            {children}
        </CartContext.Provider>
    )
}

