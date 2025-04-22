import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Payment from './components/Payment';
import { Product } from './types';

const App = () => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter(p => p.id !== id));
    };

    return (
        <Router>
            <nav>
                <Link to="/">Products</Link> | <Link to="/cart">Cart</Link> | <Link to="/payment">Payment</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Products addToCart={addToCart} />} />
                <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
                <Route path="/payment" element={<Payment cart={cart} />} />
            </Routes>
        </Router>
    );
};

export default App;
