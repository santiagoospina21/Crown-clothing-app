import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import {
  CartDropDownComponent,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const gotoCheckoutHandler = () => navigate("/checkout");

  return (
    <CartDropDownComponent>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your Cart is Empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={gotoCheckoutHandler}>GO TO CHECK OUT</Button>
    </CartDropDownComponent>
  );
};

export default CartDropdown;
