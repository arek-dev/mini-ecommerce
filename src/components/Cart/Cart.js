import React from "react";
import styles from "./Cart.module.scss";

class Cart extends React.Component {
    render() {
        return (
            <>
                <section className={styles["cart__wrap"]}>

                <h4 className={styles["cart__wrap-heading"]} >Cart</h4>
                <div className={`${styles["cart__wrap-divider"]} ${styles["mt-md2"]}`}></div>
                <div className={styles["cart__description"]} >
                  <h4 className={styles["cart__title"]} >Apollo</h4>
                  <p className={styles["cart__subtitle"]} >Running Short</p>
                  <p className={styles["cart__price"]} >$50.00</p>
                  <p className={`${styles["cart__properties"]} ${styles["mt-xs"]}`}>SIZE:</p>
                  <div className={styles["cart__properties-items"]} >

                  </div>
                </div>  

                </section>
            </>
        )
    }
}

export default Cart;