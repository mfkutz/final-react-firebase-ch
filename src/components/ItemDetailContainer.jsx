import { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { BeatLoader } from 'react-spinners'
import '../styles/itemDetailContainer.css'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { pid } = useParams()
    useEffect(() => {
        const dbFirestore = getFirestore()
        const queryDoc = doc(dbFirestore, 'productos', pid)
        getDoc(queryDoc)
            .then(resp => setProduct({ id: resp.id, ...resp.data() }))
            .catch(error => { console.log(error) })
            .finally(() => setIsLoading(false))
    }, [])
    return (
        <>
            {isLoading ?
                <div className='container-spin'>
                    <BeatLoader color="#e4db5f" />
                </div>
                :
                <div className='as-detail'>
                    <ItemDetail {...product} />
                </div>
            }
        </>
    )
}
export default ItemDetailContainer