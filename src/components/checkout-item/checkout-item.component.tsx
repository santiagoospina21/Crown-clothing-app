import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CheckOutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { quantity, name, price, imageUrl } = cartItem;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckOutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`}></img>
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>

      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckOutItemContainer>
  );
};

export default CheckoutItem;
