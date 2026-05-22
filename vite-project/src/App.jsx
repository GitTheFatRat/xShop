import { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import ProductDetail from "./ProductPages";
import YeuThich from "./SidePages/YeuThich";
import Cart from "./SidePages/Cart";

export default function App() {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }

    function updateQuantity(id, quantity) {
        if (quantity < 1) return removeFromCart(id);
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mainhome" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/yeu-thich" element={<YeuThich />} />
            <Route
                path="/cart"
                element={
                    <Cart
                        items={cartItems}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                        clearCart={clearCart}
                    />
                }
            />
        </Routes>
    );
}