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
        <div key={id} className="checkoutProduct">
            <img src={thumbnail} alt="" className="checkoutProduct__image" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}
                </p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array.from({ length: rating }, (_, i) => (
                        <span key={i}>⭐</span>
                    ))}
                </div>
                <button onClick={removeFromBasket} className="checkoutProduct__removeButton">
                    Remove from Basket
                </button>
            </div>
        </div>
    )
}
