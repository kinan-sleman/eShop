import type { ProductProps } from "../../types/product";
import { useStateContext } from "../../contexts/StateContext";
import { toast } from 'react-toastify';

export default function Product({ id, title, price, rating, thumbnail }: ProductProps) {
    const [{ basket }, dispatch] = useStateContext();

    const addToBasket = async () => {
        // Check if item already exists in basket
        const existingItem = basket.find(item => item.id === id.toString());
        if (existingItem) {
            toast.error('This item is already in your basket!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id.toString(),
                title,
                price,
                rating,
                thumbnail
            }
        });

        toast.success('Item added to basket!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div className="product" key={id}>
            <img
                src={thumbnail}
                alt={title}
                className="product__image"
            />
            <div className="product__info">
                <h3 className="product__title">{title}</h3>
                <div className="product__price-container">
                    <span className="product__price">${price.toFixed(2)}</span>
                    <div className="product__rating">
                        {Array.from({ length: Math.round(rating) }, (_, i) => (
                            <span key={i} className="product__star">⭐</span>
                        ))}
                        <span className="product__rating-count">({rating.toFixed(1)})</span>
                    </div>
                </div>
            </div>
            <button
                className="product__button"
                onClick={addToBasket}
            >
                Add to Basket
            </button>
        </div>
    )
}
