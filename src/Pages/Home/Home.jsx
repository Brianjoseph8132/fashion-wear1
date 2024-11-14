import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {
  // State to store product data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products data when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div>
      {/* Header Section */}
      
        <div className='header-t'>
            <div className='low'>
              <h1>GOOD SHOES TAKE YOU <br /> TO GOOD PLACES</h1>

              <Link to="/shop">
                <button>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> Shop Now
                </button>
              </Link>
            </div>
            <div className='row'>
                <img 
                src="https://i.pinimg.com/736x/6d/9f/43/6d9f43bbf69e921bf6f8db05eff0ddf2.jpg" 
                alt="New Arrivals" 
                className="img-fluid" 
                />
            </div>
        </div>
      

      {/* Main Content Section */}
      <main className="container mt-5">
        <h1 className='title'>Featured Products</h1>
        <div className="row justify-content-center">
          {/* Render product cards */}
          {products.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card p-0 hover-card">
                {/* Image with reduced margin/padding */}
                <img 
                  src={product.imageUrl} 
                  className="card-img-top img-fluid p-0 m-0"  // Remove padding and margin from the image
                  alt={product.name} 
                  style={{ objectFit: 'contain', height: '200px' }} // Contain without cropping
                />
                <div className="card-body p-2"> {/* Reduced padding in card body */}
                  {/* Only showing name and price */}
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}

export default Home;
