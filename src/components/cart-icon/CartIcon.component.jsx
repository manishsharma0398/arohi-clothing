import React, { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartCount, toggleIsCartOpen } = useContext(CartContext);

  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
