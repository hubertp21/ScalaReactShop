import React, { useEffect, useState } from 'react';
import { Product } from '../types';

interface Props {
    addToCart: (product: Product) => void;
}

const Products = ({ addToCart }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} – {p.price} zł
                        <button onClick={() => addToCart(p)}>Add to cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
