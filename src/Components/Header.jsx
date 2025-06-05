import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Header() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <span className="header-icon">🛒</span>
          My Online Shop
        </h1>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            Home
          </Link>
          
          <Link to="/cart" className="nav-link">
            <span className="nav-icon">🛍️</span>
            Cart
          </Link>
          
          {user && (user._id || user.id) ? (
            <div className="user-section">
              <button 
                onClick={handleLogout}
                className="nav-link logout-btn"
              >
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-link">
              <span className="nav-icon">🔐</span>
              Login
            </Link>
          )}
        </nav>
      </div>
      
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 3px solid rgba(255, 255, 255, 0.2);
        }
        
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .header-title {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .header-icon {
          font-size: 2.2rem;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
          backdrop-filter: blur(10px);
          font-size: 0.95rem;
        }
        
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .nav-icon {
          font-size: 1.1rem;
        }
        
        .logout-btn {
          background: rgba(255, 255, 255, 0.15) !important;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.95rem;
        }
        
        .logout-btn:hover {
          background: rgba(255, 87, 87, 0.3) !important;
          color: #fff;
        }
        
        .login-link:hover {
          background: rgba(76, 175, 80, 0.3);
        }
        
        .user-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .welcome-text {
          color: white;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          font-size: 0.9rem;
        }
        
        .username {
          color: #ffd700;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        @media (max-width: 768px) {
          .header-container {
            padding: 0.75rem 1rem;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .header-title {
            font-size: 1.5rem;
          }
          
          .nav-links {
            justify-content: center;
            gap: 0.25rem;
          }
          
          .nav-link {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          
          .user-section {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
          
          .welcome-text {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .nav-link {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          
          .nav-icon {
            font-size: 1rem;
          }
          
          .header-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </header>
  );
}