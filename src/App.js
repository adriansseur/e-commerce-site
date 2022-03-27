import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Cart from "./components/Cart"
import Home from "./components/Home"
import About from "./components/About"
import Products from "./components/Products.tsx"
import Recipes from "./components/Recipes"
import Newsletter from "./components/Newsletter"
import Contact from "./components/Contact"
import Checkout from "./components/Checkout"
import data from "./productsData"
import {gsap} from "gsap"

export default function App() {

    // Source of truth. Controls menu and cart visibility
    const [isToggled, setIsToggled] = React.useState({
        menu: false,
        cart: false
    })

    // Source of truth. Controls product data
    const [productsItems, setProductsItems] = React.useState(data)

    // Source of truth. Controls opacity of components
    const [componentOpacity, setComponentOpacity] = React.useState("1")

    // Displaying products data  and toggled state in console. For testing
    React.useEffect(() => {
        console.log(productsItems, isToggled)
    }, [productsItems, isToggled])

    // Controlling opacity if menu or cart are open
    React.useEffect(() => {
        if (isToggled.menu || isToggled.cart) {
            setComponentOpacity("0.1")
        } else if (!isToggled.menu && !isToggled.cart) {
            setComponentOpacity("1")
        }
    }, [isToggled])

    // Close the cart and menu
    function closeCartMenu() {
        setIsToggled({
            menu: false,
            cart: false
    })
    }

    // animations for menu and cart
    const tl = gsap.timeline({
        defaults: {duration: 0.75}
    })

    return (
        <div className="app-container">
            <Header
                setIsToggled={setIsToggled}
                closeCartMenu={closeCartMenu} />
            <Menu
                tl={tl}
                isToggled={isToggled}
                setIsToggled={setIsToggled}
                closeCartMenu={closeCartMenu} />
            <Cart
                tl={tl}
                isToggled={isToggled}
                setProductsItems={setProductsItems}
                productsItems={productsItems}
                closeCartMenu={closeCartMenu} />
            
            <Routes >
                <Route path="e-commerce-site/" element={<Home componentOpacity={componentOpacity}/>} />
                <Route path="e-commerce-site/about" element={<About componentOpacity={componentOpacity}/>} />
                <Route path="e-commerce-site/products" element={<Products
                    componentOpacity={componentOpacity}
                    productsItems={productsItems}
                    setProductsItems={setProductsItems} />} />
                <Route path="e-commerce-site/recipes" element={<Recipes componentOpacity={componentOpacity}/>} />
                <Route path="e-commerce-site/newsletter" element={<Newsletter componentOpacity={componentOpacity}/>} />
                <Route path="e-commerce-site/contact" element={<Contact componentOpacity={componentOpacity} />} />
                <Route path="e-commerce-site/checkout" element={<Checkout
                    componentOpacity={componentOpacity}
                    productsItems={productsItems}
                    setProductsItems={setProductsItems}
                />} />
            </Routes>

        </div>
    )
}