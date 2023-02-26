import React, { Fragment } from "react";

import mealsImage from '../../assets/Meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FreeMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes[`main-image`]}>
        <img src={mealsImage} alt='A Table Full Of Delicious Meals' />
      </div>
    </Fragment>
  )
};

export default Header;