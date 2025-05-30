import CurrencyFormat from "react-currency-format"
import { getBasketTotal, useStateContext } from "../../contexts/StateContext"

export default function Subtotal() {
    const [state] = useStateContext();
    const { basket } = state;
    const basketTotal = getBasketTotal(basket);
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value: string) => (
                    <>
                        <p>Subtotal ({basket.length} items): <strong>{value}</strong> </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" name="" id="" />
                            This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={basketTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />
            <button className="checkout__button">
                Proceed to checkout
            </button>
        </div>
    )
}
