import React from "react";

const CartPage = ({
  cartItems = [],
  updateCartItemQuantity,
  removeCartItem,
  totalAmount,
}) => {
  const handleQuantityChange = (productId, newQuantity) => {
    if (!isNaN(newQuantity)) {
      const updatedQuantity = Math.max(parseInt(newQuantity), 0);

      updateCartItemQuantity(productId, updatedQuantity);
    }
  };

  return (
    <div
      className="cart-page"
      style={{ paddingLeft: "auto", paddingTop: "2rem", paddingBottom: "7rem" }}
    >
      <h2 className="shopping-cart" style={{ paddingBottom: "2rem" }}>
        Shopping Cart
      </h2>
      {!cartItems.length ? (
        <p className="empty">Your cart is empty. Add items to the cart :)</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              className="cart-grid"
              key={item.id}
              style={{ marginBottom: "0.5rem" }}
            >
              <div className="cart-img">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  style={{
                    height: "5rem",
                    width: "5rem",
                    paddingLeft: "1rem",
                    objectFit: "cover",
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                    marginLeft: "0.5rem",
                  }}
                />
              </div>
              <div className="cart-details">
                <div className="cart-name" style={{ fontWeight: "bold" }}>
                  {item.name}
                </div>
                <div className="cart-price">Rs. {item.price}</div>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  max={item.quantityAvailable}
                  className="quantity-input"
                />

                <button
                  className="remove-button"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <span>
            <hr />
          </span>
          <p className="total-amount" style={{ paddingLeft: "auto" }}>
            <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>
              Total Amount:{" "}
            </span>{" "}
            <span style={{ fontSize: "1.3rem" }}>Rs. {totalAmount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPage;