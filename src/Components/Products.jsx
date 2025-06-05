import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import './Products.css';

export default function Product() {
  const {user}= useContext(AppContext);
  const [products,setProducts]=useState([]);
  const API=import.meta.env.VITE_API_URL
  useEffect(()=>{
    fetch(`${API}products/all`)
      .then(res=>res.json())
      .then(data=>setProducts(data))
      .catch(er=>console.error(err));
  }, []);
  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name?user.name:'Guest'}!</h3>
        <div className="welcome-message">
          Browse our amazing collection of products
        </div>
        <div className="products-grid">
          {products.map(product=>(
            <div key={product.id}className="product-card">
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../App';
// import './Products.css';

// export default function Product() {
//   const { user } = useContext(AppContext);
//   const [products, setProducts] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [email, setEmail] = useState('');
//   const [orderValue, setOrderValue] = useState('');
//   const API = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetch(`${API}products/all`)
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('https://gcet-node1-app.vercel.app/order/new', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, orderValue: Number(orderValue) })
//       });
//       const data = await res.json();
//       alert('Order placed successfully!');
//       setShowPopup(false);
//       setEmail('');
//       setOrderValue('');
//     } catch (error) {
//       console.error('Failed to submit order:', error);
//       alert('Error placing order');
//     }
//   };

//   return (
//     <main>
//       <div className="products-container fade-in">
//         <h3>Welcome {user?.name ? user.name : 'Guest'}!</h3>
//         <div className="welcome-message">
//           Browse our amazing collection of products
//         </div>
//         <div className="products-grid">
//           {products.map(product => (
//             <div key={product.id} className="product-card">
//               <h4>{product.name}</h4>
//               <p className="price">₹{product.price}</p>
//               <button>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//         <button className="order-button" onClick={() => setShowPopup(true)}>
//           Place Order
//         </button>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-form">
//             <h3>Place Your Order</h3>
//             <form onSubmit={handleOrderSubmit}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Order Value"
//                 value={orderValue}
//                 onChange={(e) => setOrderValue(e.target.value)}
//                 required
//               />
//               <div className="popup-buttons">
//                 <button type="submit">Submit</button>
//                 <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
