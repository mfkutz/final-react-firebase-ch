import { useEffect, useState } from 'react'
import ItemList from './ItemList'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { cid } = useParams()
    useEffect(() => {
        const dbFirestore = getFirestore()
        const queryCollection = collection(dbFirestore, 'productos')
        if (!cid) {
            // get all the products
            getDocs(queryCollection)
                .then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false))
        } else {
            // add this line using 'query' and 'where' that receives 3 parameters
            const queryCollectionFiltered = query(
                queryCollection,
                where('category', '==', cid),
            )
            getDocs(queryCollectionFiltered)
                .then(res => setProducts(res.docs.map(product => ({ id: product.id, ...product.data() }))))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false))
        }
    }, [cid])
    return (
        <div className='container-prod'>
            {isLoading ?
                <BeatLoader color="#36d7b7" />
                :
                <ItemList products={products} />
            }
        </div>
    )
}
export default ItemListContainer