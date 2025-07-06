import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import "./Cart.css";
import './Products.css';

export default function Product() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`${API}/products/all`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Products loaded:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please check if the server is running.');
        setLoading(false);
      });
  }, [API]);

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(item => item._id === product._id);
      
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="products-container fade-in">
          <h3>Loading products...</h3>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="products-container fade-in">
          <h3>Error</h3>
          <p>{error}</p>
          <p>Please make sure your backend server is running on {API}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name ? user.name : 'Guest'}!</h3>
        <div className="welcome-message">
          Browse our amazing collection of products
        </div>
        <div className="products-grid">
          {products.length === 0 ? (
            <p>No products available at the moment.</p>
          ) : (
            products.map(product => (
              <div key={product._id} className="product-card">
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
                <button
                  className="btn-add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}