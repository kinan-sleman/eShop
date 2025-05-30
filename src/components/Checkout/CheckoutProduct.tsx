import { useStateContext } from "../../contexts/StateContext";
import type { ProductProps } from "../../types/product";
import { toast } from 'react-toastify';

export default function CheckoutProduct({ id, title, price, rating, thumbnail }: ProductProps) {
    const [, dispatch] = useStateContext()
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id,
                title,
                price,
                rating,
                thumbnail
            }
        });
        toast.success('Item removed from basket!', {
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
        <div className="checkoutProduct">
            <div className="checkoutProduct__container">
                <img src={thumbnail} alt="" className="checkoutProduct__image" />
                <div className="checkoutProduct__info">
                    <div className="checkoutProduct__title-container">
                        <p className="checkoutProduct__title">{title}</p>
                    </div>
                    <div className="checkoutProduct__price-container">
                        <p className="checkoutProduct__price">
                            <small>$</small>
                            <strong>{price}</strong>
                        </p>
                    </div>
                    <div className="checkoutProduct__rating-container">
                        <div className="checkoutProduct__rating">
                            {Array.from({ length: rating }, (_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                    </div>
                    <div className="checkoutProduct__button-container">
                        <button onClick={removeFromBasket} className="checkoutProduct__removeButton">
                            Remove from Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
