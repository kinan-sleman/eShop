import Product from '../components/common/Product'
import { useEffect, useState } from 'react'
import type { ProductProps } from '../types/product'

export default function Home() {
    const [products, setProducts] = useState<ProductProps[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=30&sortBy=title&order=asc')
                const data = await response.json()
                setProducts(data.products)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    if (loading) {
        return (
            <div className="home">
                <div className="home__container">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">Loading products...</div>
                        <div className="loading-pulse">
                            <div className="loading-text">Please wait...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="home">
                <div className="home__container">
                    <img className='home__image' src="https://www.x-cart.com/wp-content/uploads/2019/01/ecommerce-768x278.jpg" alt="" />
                    {products.map((_, index) => {
                        const rowNumber = Math.floor(index / 5);
                        const isSecondRow = rowNumber % 2 === 1;
                        const rowStart = rowNumber * 5;
                        const remainingProducts = products.length - rowStart;
                        const rowEnd = rowStart + Math.min((isSecondRow ? 3 : 2), remainingProducts);
                        
                        if (index === rowStart) {
                            return (
                                <div key={rowStart} className="home__row">
                                    {products.slice(rowStart, rowEnd).map((prod) => (
                                        <Product
                                            key={prod.id}
                                            id={prod.id.toString()}
                                            title={prod.title}
                                            price={prod.price}
                                            rating={prod.rating}
                                            thumbnail={prod.thumbnail}
                                        />
                                    ))}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    )
}
