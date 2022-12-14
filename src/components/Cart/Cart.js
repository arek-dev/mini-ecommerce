import React from "react";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import { addProduct, removeProduct } from '../../redux/cartSlice'
import cartAdd from '../../images/cart_add.svg'
import cartRemove from '../../images/cart_rem.svg'
import CartGallery from "../CartGallery/CartGallery";

const mapStateToProps = (state) => {
  return {
    products: state.rootReducer.cart.products,
    activeCurrency: state.rootReducer.currency.activeCurrency,
  };
};

const mapDispatchToProps = {
  addProduct,
  removeProduct,
};


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  render() {
    return (
      <>
        <section className={styles["cart__wrap"]}>
          <h4 className={styles["cart__wrap-heading"]}>Cart</h4>
          <div className={`${styles["cart__wrap-divider"]} ${styles["mt-md2"]}`}></div>
            {this.props.products.length === 0 ? (
              <div className={styles["cart__description"]}>
                <h4 className={styles["cart__title"]}>Your cart is empty</h4>
              </div>            
            ) : null
            };

            {this.props.products?.map((item) =>
            <>
              <div key={item.product.id} className={styles["cart__description"]}>
                <h4 className={styles["cart__title"]}>{item.product.brand}</h4>
                <p className={styles["cart__subtitle"]}>{item.product.name}</p>
                <p className={styles["cart__price"]}>
                  {this.props.activeCurrency.label ? (
                    <>
                      {this.props.activeCurrency.symbol + " "}   
                      {item.product.prices.find((el) => {
                        return el.currency.label === this.props.activeCurrency.label;
                      }).amount} 
                      </>
                      ) : (
                      <>
                      $ {item.product.prices[0].amount}
                      </>                      
                    )}
                </p>

                {item.product.attributes.map((attribute) => {
                    if (attribute.type === "swatch") {
                      return (
                      <div key={item.product.id + attribute.id}>
                        <p className={`${styles["cart__properties"]} ${styles["mt-mxs"]}`}>{attribute.name}</p>
                        <div className={`${styles["cart__properties-items"]}`}>

                        {attribute.items.map((attributeItem) => {
                          return (                          
                            <div key={item.product.id + attributeItem.id}>
                              <input type="radio" name={attribute.name} id={attribute.name + attributeItem.id} value={attributeItem.value}/>
                              <label for={attribute.name + attributeItem.id}>
                              <span className={`${styles["cart__properties-color"]}`} style={{backgroundColor: `${attributeItem.value}`}}></span>
                              </label>
                            </div>
                        )})}
                        </div>
                      </div>
                      )
                    }
                    return (
                      <div key={item.product.id + attribute.id}>
                        <p className={`${styles["cart__properties"]} ${styles["mt-xs"]}`}>{attribute.name}</p>
                        <div className={`${styles["cart__properties-items"]}`}>
                          {attribute.items.map((attributeItem) => {
                          return (                          
                            <div key={item.product.id + attributeItem.id}>
                              <input type="radio" name={item.product.id + attribute.name} id={attribute.name + attributeItem.id} value={attributeItem.value}/>
                              <label for={attribute.name + attributeItem.id}>
                              <button type="button" className={`${styles["cart__properties-btn"]}`} id={attribute.name + attributeItem.id}>{attributeItem.value}</button>
                              </label>
                            </div>
                          )})}
                        </div>
                      </div>
                  )})}                    
              </div> 

              <div className={`${styles["cart__pictures"]}`}>
                <div className={`${styles["cart__addrem"]}`}>
                  <button 
                    onClick={() => this.props.addProduct(item.product)}   
                    className={`${styles["cart__btn-addrem"]}`}
                  >
                    <img src={cartAdd} alt="add" />
                  </button>
                  <p className={`${styles["cart__count"]}`}>
                  {item.productQuantity}
                  </p>
                  <button
                    onClick={() => this.props.removeProduct(item.product)}   
                    className={`${styles["cart__btn-addrem"]}`}
                  >
                    <img src={cartRemove} alt="remove" />
                  </button>
                </div>
                <div className={`${styles["cart__pictures-fig"]}`}>
                  <CartGallery data={item.product.gallery} />                   
                </div>
              </div>
              <div className={`${styles["cart__wrap-divider"]}`}></div>             
           </>
            )}                     
        </section>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

