import MealsSummary from "./MealsSummery";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  )
}

export default Meals;