import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button.component";
import CartItems from "../cart-items/CartItems.component";

import { CartContext } from "../../context/cart.context";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, toggleIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    toggleIsCartOpen();
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItems key={cartItem.key} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
