import React from "react";
import { Query } from "@apollo/client/react/components";
import { getProductsList } from "../../queries/queries";
import { connect } from "react-redux";
import styles from "./ProductsList.module.scss";
import addtocart from '../../images/addtocart.svg'
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {    
  return {
    activeCategory: state.rootReducer.categories.activeCategory,
    activeCurrency: state.rootReducer.currency.activeCurrency,
  };
};  

class ProductsList extends React.Component {

    renderProducts = (products) => {
        return products.map((product) => {
          return (
            <Link key={product.id} to={`/products/${product.id}`} >
            <div className={styles["product__wrap"]}>
            {product.inStock === false ? (
              <>
                <div className={styles["product__outOfStock"]}>
                  <p className={styles["product__outOfStock-text"]}>Out of stock</p>
                </div>
              </>
            ) : null             
            }
              <img src={product.gallery[0]} alt={product.name} className={styles["product__img"]} />
              <div className={styles["product__teaser"]}>
                    <h4 className={styles["product__description"]}>{product.name}</h4>
                    <div className={styles["product__price"]}>

                    {this.props.activeCurrency.label ? (
                      <>
                        {this.props.activeCurrency.label + " "}   
                        {product.prices.find((el) => {
                         return el.currency.label === this.props.activeCurrency.label;
                        }).amount} 
                      </>
                      ) : (
                      <>
                        {product.prices[0].currency.label} {product.prices[0].amount} 
                      </>                      
                    )}
                      
                    </div>                    
              </div>
              <div className={styles["product__addtocart"]}>
                <img src={addtocart} alt="Add to cart icon" />
              </div>                
            </div>             
            </Link>            
          );
        });
      };  

  handleCurrentCategoryName = () => {
    return this.props.activeCurrency === "" ? "all" : this.props.activeCategory;
  };
  
  render() {
    return (
      <>
        <section className={`${styles["heading__category"]} ${styles["mb-md"]}`}>
          <h2 className={styles["heading2"]}>{this.handleCurrentCategoryName()}</h2>
        </section>
        <section className={styles["product__cards"]}>
        
          <Query
            query={getProductsList}
            variables={{ title: this.props.activeCategory }}
          >
            {({ loading, data }) => {
              if (loading) return "loading...";
              return this.renderProducts(data.category.products);
            }}            
          </Query>
          
        </section>
      </>
    );
  }
}

export default connect(mapStateToProps)(ProductsList);

