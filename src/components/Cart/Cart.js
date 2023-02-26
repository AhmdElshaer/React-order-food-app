import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modals';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitHandler = async (userdata) => {
    setIsSubmitting(true);
    await fetch('https://reacthttp-50bcb-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userdata,
        orderitems: cartCtx.items
      })
    })
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const CartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => (
    <CartItem 
    key={item.id} 
    name={item.name}
    amount={item.amount}
    price={item.price}
    onRemove={cartItemRemoveHandler.bind(null, item.id)}
    onAdd={cartItemAddHandler.bind(null, item)}
    />
    ))}
    </ul>;

    const cartModalContent = <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={onSubmitHandler} onCancil={props.onClose}/>}
      {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>close</button>
        {hasItems && <button className={classes.button} onClick={onOrderHandler}>Order Now</button>}
      </div>}
    </React.Fragment>;

    const isSubmittingModalContent = <p>Sending Oreder Data...</p>;

    const didSubmitModalContent = <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>close</button>
      </div>
      </React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;