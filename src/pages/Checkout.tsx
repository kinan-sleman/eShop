import CheckoutProduct from "../components/Checkout/CheckoutProduct";
import Subtotal from "../components/Checkout/Subtotal";
import { useStateContext } from "../contexts/StateContext";
import type { ProductProps } from "../types/product";

export default function Checkout() {
    const [{ basket }] = useStateContext();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout__ad" />

                <h2 className="checkout__title">
                    Your Shopping Basket
                </h2>
                <div className="checkout__products">
                    {basket?.map((item: ProductProps) => (
                        <CheckoutProduct
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}
