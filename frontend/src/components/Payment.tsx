import React, { useState } from 'react';
import { Product } from '../types';

interface Props {
    cart: Product[];
}

const Payment = ({ cart }: Props) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = Date.now();
    const [method, setMethod] = useState('card');
    const [message, setMessage] = useState('');

    const submitPayment = async () => {
        if (cart.length === 0) {
            setMessage("Your cart is empty.");
            return;
        }

        try {
            const res = await fetch('/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    amount: total,
                    method
                })
            });

            const data = await res.json();
            setMessage(data.status || 'Payment completed.');
        } catch (err) {
            setMessage('Something went wrong with the payment.');
        }
    };

    return (
        <div>
            <h2>Payment</h2>
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Total amount:</strong> {total.toFixed(2)} PLN</p>
            <label>
                Payment method:
                <select value={method} onChange={e => setMethod(e.target.value)}>
                    <option value="card">Card</option>
                    <option value="blik">BLIK</option>
                    <option value="paypal">PayPal</option>
                </select>
            </label>
            <button onClick={submitPayment} style={{ marginLeft: '10px' }}>Submit payment</button>
            {message && <p style={{ marginTop: '10px' }}><strong>{message}</strong></p>}
        </div>
    );
};

export default Payment;
