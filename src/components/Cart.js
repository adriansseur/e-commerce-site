import React from "react"
import "../styles/Cart.scss"
import { Link } from "react-router-dom"
import AmountSelector from "../subcomponents/AmountSelector"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

// export default function Cart({ isToggled, productsItems, setProductsItems, closeCartMenu, tl }) {
export default function Cart({ isToggled, productsItems, setProductsItems, closeCartMenu, setProceededToCheckout }) {
    
    // display cart animation
    const cartContainer = React.useRef(null)
    React.useEffect(() => {
        if (isToggled.cart && !isToggled.menu) {
            cartContainer.current.style.maxHeight = "100vh"
        } else {
            cartContainer.current.style.maxHeight = "0"
        }
    }, [isToggled])

    // Eliminates product from cart, regardless of amount in selector
    function handleCloseClick(itemNumber) {
        setProductsItems(prev => {
            const newState = prev.map(product => {
                if (product.itemNumber === itemNumber) {
                    const modifiedProduct =
                    {
                        ...product,
                        amountInCart: 0
                    }
                    return modifiedProduct
                } else return product
            })
            return newState
        })
    }

    // loop through productsData state and render cart if any
    let cartElements = productsItems.map(product => {
        if (product.amountInCart !== 0) {
            return (
                <div key={product.itemNumber} className="card">
                    <FontAwesomeIcon
                        className="close-btn"
                        icon={faClose}
                        onClick={() => handleCloseClick(product.itemNumber)}
                    />
                    <img src={process.env.PUBLIC_URL + product.src}></img>
                    <div className="info-container">
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <AmountSelector
                            product={product}
                            setProductsItems={setProductsItems}
                            desiredAmount="amountInCart" />
                    </div>
                </div>
            )
        }
    })

    // if cart is empty, tell user
    // if cart has items display checkout button
    if (cartElements.every(e => e === undefined ? true : false)) {
        cartElements = <p>No items in Cart</p>
    } else {
        cartElements.push(
            <Link
                key="checkout-button"
                to="/checkout"
                id="proceed-to-checkout-link"
                onClick={() => {
                    // closeCartMenu
                    setProceededToCheckout(true)
                }
                }
            >Proceed to Checkout</Link>
        )
    }

    return (
        <div ref={cartContainer} className="cart-container">
        {/* <div className="cart-container"> */}
            {cartElements}
        </div>
    )
}