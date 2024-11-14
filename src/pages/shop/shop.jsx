import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Shop.css';
import AddProduct from '../../components/AddProduct/AddProduct';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(existingCart);
    }, []);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1, subTotal: (item.quantity + 1) * item.price }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1, subTotal: product.price }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleProceedToPayment = () => {
        setCart([]);
        localStorage.removeItem("cart");
        alert("Proceeding to payment... Your cart has been cleared.");
    };

    return (
        <div className="shop-page container">
            <h2>Offer!!! 30% Off Each Product!</h2>
            {/* Add the AddProduct component here */}
            <div className="add-product-section mt-5">
              <AddProduct />
            </div>

            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-3 mb-3">
                        <div className="card h-100 product-card">
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="card-img-top img-fluid"
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                            </Link>
                           
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                >
                                    <FaCartPlus /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-section mt-5">
                <h3>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.subTotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="net-total">
                    <strong>Total: ${cart.reduce((total, item) => total + item.subTotal, 0).toFixed(2)}</strong>
                </div>
                <button
                    className="btn btn-success mt-3"
                    onClick={handleProceedToPayment}
                    disabled={cart.length === 0}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Shop;
