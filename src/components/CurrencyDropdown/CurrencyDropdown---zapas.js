import React from 'react';
import { Query } from "@apollo/client/react/components";
import { getCurrencies } from "../../queries/queries";
import { connect } from "react-redux";
import { setActiveCurrency } from '../../redux/currencySlice'
import styles from "./CurrencyDropdown.module.scss";
import arrowDown from '../../images/arrow_down.svg';

const mapStateToProps = (state) => {  
  return {
    activeCurrency: state.rootReducer.currency.activeCurrency,
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
        this.state = {
          open: false,
        };
      }

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
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ open: false});
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
                <span>{this.props.activeCurrency.symbol}</span>
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
            </div>
        );
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);