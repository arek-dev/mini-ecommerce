import React from "react";
import { createRef } from 'react';
import styles from "./CartOverlay.module.scss";
import { connect } from "react-redux";
import { addProduct, removeProduct } from '../../redux/cartSlice'
import { Link } from "react-router-dom";
import cartAdd from '../../images/cart_add.svg'
import cartRemove from '../../images/cart_rem.svg'

const mapStateToProps = (state) => {
  return {
    products: state.rootReducer.cart.products,
    cartQuantity: state.rootReducer.cart.cartQuantity,
    activeCurrency: state.rootReducer.currency.activeCurrency,
  };
};

const mapDispatchToProps = {
  addProduct,
  removeProduct,
};

class CartOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.wrapperRefCart = React.createRef(null);
    this.handleClickOutsideCart = this.handleClickOutsideCart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      openCart: false,
    };
  }

  toggle = () => {
    this.setState({ openCart: true });
  } 

  toggleOff = () => {
    this.setState({ openCart: false });
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideCart, { capture: true });
    this.props.setClick(this.toggle);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideCart, { capture: true });
  }

  handleClickOutsideCart(event) {
    if (
      this.wrapperRefCart.current && 
      !this.wrapperRefCart.current.contains(event.target)
      ) {
        console.log(event.target, 'ref:', this.wrapperRefCart);
        this.setState({ openCart: false });
    }
  }

  countCartValue(tempValue, item) {
    let totalPrice = tempValue;    
    const price = 
    this.props.activeCurrency.label ? 
      (item.product.prices.find(
      (el) => el.currency.label === this.props.activeCurrency.label,
      ).amount) : (
      item.product.prices[0].amount
    )
    const productSum = price * item.productQuantity;
    totalPrice += productSum;
    return totalPrice;
  }

  render() {
    let tempValue = 0;
    return (
            
      this.state.openCart && (
        
      <>
        <div className={styles["overlay"]}></div>
        <div ref={this.wrapperRefCart} className={styles["cart__overlay"]}>
          <h4 className={styles["cart__overlay-heading"]}>My Bag. {this.props.cartQuantity} items</h4>
            {this.props.products.length === 0 ? (
              <div className={styles["cart__description"]}>
                <h4 className={styles["cart__title"]}>Your cart is empty</h4>
              </div>            
            ) : null
            }

            {this.props.products?.map((item) =>{
              tempValue = this.countCartValue(tempValue, item);

            return (
            <>
              <div key={item.product.id} className={styles["cart__item"]}>
              <div className={styles["cart__description"]}>
                <h4 className={styles["cart__title"]}>{item.product.brand}</h4>
                <p className={styles["cart__title"]}>{item.product.name}</p>
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
                  <img src={item.product.gallery[0]} alt={item.product.name} className={`${styles["cart__pictures-img"]}`}/>
                </div>
              </div>
              </div>
           </>
           )}
            )}   
            <div className={`${styles["cart__summary"]}`}>
              <div className={`${styles["cart__summary-left"]}`}>
                <p>Total:</p>
              </div>
              <div className={`${styles["cart__summary-right"]}`}>
                <p>
                  {this.props.activeCurrency.label ? (                    
                    `${this.props.activeCurrency.symbol + " "}`                  
                    ) : (`$ `)} 
                  {tempValue.toFixed(2)}
                </p>
              </div>
            </div>  
            <div className={`${styles["cart__summary-buttons"]}`}>
              <button 
                type="button"
                className={`${styles["cart__summary-view"]} ${styles["mt-xs"]}`} 
              >
               <Link onClick={this.toggleOff.bind(this)} to="/cart">view bag</Link>              
              </button>
              <button type="submit" className={`${styles["cart__summary-checkout"]} ${styles["mt-xs"]}`} >check out</button>
            </div>
            
        </div>
      </>
      )            
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);