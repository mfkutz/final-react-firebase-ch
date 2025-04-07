import Item from './Item'
import '../styles/itemlist.css'

function ItemList({ products }) {
  return (
    <div className='nn'>
      {products.map(({ id, product, description, price, image, category, stock }) => (
        <Item
          key={id}
          id={id}
          product={product}
          description={description}
          price={price}
          image={image}
          category={category}
          stock={stock}
        />
      ))}
    </div>
  )
}
export default ItemList