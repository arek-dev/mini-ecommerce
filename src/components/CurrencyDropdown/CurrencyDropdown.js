import React from 'react';
import { Query } from "@apollo/client/react/components";
import { getCurrencies } from "../../queries/queries";
import { connect } from "react-redux";
import { setActiveCurrency } from '../../redux/currencySlice'
import styles from "./CurrencyDropdown.module.scss";
import arrowDown from '../../images/arrow_down.svg';
import cart from '../../images/cart.svg';
import { Link } from "react-router-dom";
import CartOverlay from '../CartOverlay/CartOverlay';


const mapStateToProps = (state) => {  
  return {
    activeCurrency: state.rootReducer.currency.activeCurrency,
    cartQuantity: state.rootReducer.cart.cartQuantity,
  };
};

const mapDispatchToProps = {
  setActiveCurrency,  
};

class CurrencyDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef(false);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.child = React.createRef();
        this.state = {
          open: false,
        };
      }

      onClickCart = () => {
        this.child.current.toggle();
      };  
     
      handleOpen = () => {
        this.setState(prevState => ({
            open: !prevState.open
          }));
      } 
      
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        this.props.setActiveCurrency(this.props.activeCurrency);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      handleClickOutside(event) {
        event.stopPropagation();
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ open: false});
            event.stopPropagation();
        }
      }      

      renderCurrencies = (currency) => {
        
        return currency.map((currency) => {
          if (this.state.open) {
            return (     
              <button 
                key = {currency.label}  
                className={`${styles["header__right-item"]}`} 
                onClick={() => {
                  this.props.setActiveCurrency(currency);
                  this.setState({ open: false});
                }}
                >
                {currency.label} {currency.symbol}
                </button>                    
            )
          }          
        });
      };    
      
    render() {

        return (
            <div ref={this.wrapperRef} className={`${styles["header__right"]}`} >

              <div role="button" className={styles['header__right-button']} onClick={this.handleOpen}>
                <span>
                {this.props.activeCurrency.symbol ?? 
                  <Query query={getCurrencies} >
                    {({ loading, data }) => {
                    if (loading) return "loading...";
                    return data.currencies.find((el) => {
                        return el.label === this.props.activeCurrency;
                      }).symbol;
                    }}            
                  </Query>
                }                  
                </span>
                {this.state.open ? (
                  <img src={arrowDown} alt="logo" className={`${styles["header__logo-imgup"]}`} />
                  ) : (
                  <img src={arrowDown} alt="logo" className={`${styles["header__logo-img"]}`} />
                )}
              </div>

              <div role="menu" className={`${styles["header__right-dropdown"]}`} >

              <Query query={getCurrencies} >
                {({ loading, data }) => {
                  if (loading) return "loading...";
                  return this.renderCurrencies(data.currencies);
                }}            
              </Query>

              </div> 
                <div role="button" className={styles['header__right-wrap']} onClick={() => this.clickChild()}>
                  <img src={cart} alt="cart icon" className={styles['header__right-img']}/>
                  {this.props.cartQuantity > 0 ?
                  <div className={styles['header__right-badge']}>
                    <p className={styles['header__right-counter']}>{this.props.cartQuantity}</p>
                  </div>
                  : null }
                  <CartOverlay setClick={click => this.clickChild = click}/>
                </div>
            </div>
        );
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);