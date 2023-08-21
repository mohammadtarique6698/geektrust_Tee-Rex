import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Header = ({ cartItemCount }) => {
  return (
    <div className="Tee-rex">
      <div
        style={{
          paddingLeft: "1rem",
          cursor: "pointer",
        }}
      >
        <h5>
          <Link to="/">TeeRex Store</Link>
        </h5>
      </div>

      <div className="cart">
        <Link to="/Cart">
          <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;