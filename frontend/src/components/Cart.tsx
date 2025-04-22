import React from 'react';
import { Product } from '../types';

interface Props {
    cart: Product[];
    removeFromCart: (id: number) => void;
}

const Cart = ({ cart, removeFromCart }: Props) => (
    <div>
        <h2>Cart</h2>
        {cart.length === 0 ? (
            <p>Cart is empty.</p>
        ) : (
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} – {item.price} zł
                        <button onClick={() => removeFromCart(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Cart;
