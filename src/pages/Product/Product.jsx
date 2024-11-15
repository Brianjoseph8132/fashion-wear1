import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import "./Product.css";

const Product = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Fetch product data based on the id from URL params
    useEffect(() => {
        fetch(`https://fashion-backend-twg0.onrender.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setImageUrl(data.imageUrl);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    // Handle delete product
    const handleDelete = () => {
        fetch(`https://fashion-backend-twg0.onrender.com/products/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                nav("/shop"); // Navigate back to homepage after deletion
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    // Handle update product
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://fashion-backend-twg0.onrender.com/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
                price,
                imageUrl,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                nav("/shop"); // Navigate back to homepage after update
            })
            .catch((error) => console.error("Error updating product:", error));
    };

    return (
        <div className="product-container">
            <div className="product-details">
                <div className="product-image">
                    <img
                        src={product.imageUrl}
                        className="img-fluid rounded shadow"
                        alt={`Image of ${product.name}`}
                    />
                </div>
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <h4 className="product-price">${product.price}</h4>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger delete-btn"
                    >
                        DELETE
                    </button>
                </div>
            </div>

            <div className="product-form">
                <h3>Update Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImage(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Product;