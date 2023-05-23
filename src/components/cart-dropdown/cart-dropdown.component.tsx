import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import { setIsCartOpen } from "../../store/cart/cart.action";

import {
  CartDropDownComponent,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const isCartOpen = useSelector(selectIsCartOpen);

  const navigate = useNavigate();

  const gotoCheckoutHandler = useCallback(() => {
    navigate("/checkout");
    dispatch(setIsCartOpen(!isCartOpen));
  }, [dispatch, isCartOpen]);

  /*  useEffect(() => {
    console.log(isCartOpen);
  }, [isCartOpen]); */

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
