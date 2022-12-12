import React from "react";
import { Query } from "@apollo/client/react/components";
import { getProduct } from "../../queries/queries";
import { connect } from "react-redux";
import styles from "./ProductPage.module.scss";
import { setActiveProduct } from '../../redux/productSlice'
import { addProduct } from '../../redux/cartSlice'
import { sanitize } from "dompurify";

const mapStateToProps = (state) => {
  return {
    activeProduct: state.rootReducer.product.activeProduct,
    activeCurrency: state.rootReducer.currency.activeCurrency,
  };
};

const mapDispatchToProps = {
  setActiveProduct,
  addProduct,
};

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.lastItem = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    this.state = {
      selectedImageIndex: 0,
      itemQuantity: 1,
    };
  }

  componentDidMount() {     
    this.props.setActiveProduct(this.lastItem);
    console.log(this.lastItem);  
  }

  handleCartAdd = () => {
    this.props.addProduct({});
  }

  render() {

    const itemQuan = this.state.itemQuantity;

    return (
      <>
        <Query query={getProduct} variables={{ id: this.lastItem }}>
          {({ loading, data }) => {
            if (loading) return "loading...";

            return (
              <section className={`${styles["singleproduct__wrap"]}`}>
                <div>
                  {data.product.gallery.map((image, index) => {
                    return (
                      <figure
                        key={String(index)}
                        className={`${styles["singleproduct__galpic"]}`}
                        onClick={() => {
                          this.setState({
                            selectedImageIndex: index,
                          });
                        }}
                      >
                        <img
                          src={image}
                          alt="image"
                          className={`${styles["singleproduct__galimg"]}`}
                        />
                      </figure>
                    );
                  })}
                </div>

                <div className={`${styles["singleproduct__main"]}`}>
                  <figure className={`${styles["singleproduct__mainpic"]}`}>
                    <img
                      src={data.product.gallery[this.state.selectedImageIndex]}
                      alt="image"
                      className={`${styles["singleproduct__mainimg"]}`}
                    />
                  </figure>
                </div>

                <div className={`${styles["singleproduct__description"]}`}>
                  <h4 className={`${styles["singleproduct__title"]}`}>{data.product.brand}</h4>
                  <p className={`${styles["singleproduct__subtitle"]}`}>{data.product.name}</p>
                  <div dangerouslySetInnerHTML={{ __html: sanitize(data.product.description) }} className={`${styles["singleproduct__text"]}`}/>

                  {data.product.attributes.map((attribute) => {
                    if (attribute.type === "swatch") {
                      return (
                      <div key={data.product.id + attribute.id}>
                        <p className={`${styles["singleproduct__properties"]} ${styles["mt-md"]}`}>{attribute.name}</p>
                        <div className={`${styles["singleproduct__properties-items"]}`}>

                        {attribute.items.map((attributeItem) => {
                          return (                          
                            <div key={data.product.id + attributeItem.id}>
                              <input type="radio" name={attribute.name} id={attribute.name + attributeItem.id} value={attributeItem.value}/>
                              <label for={attribute.name + attributeItem.id}>
                              <span className={`${styles["singleproduct__properties-color"]}`} style={{backgroundColor: `${attributeItem.value}`}}></span>
                              </label>
                            </div>
                        )})}
                        </div>
                      </div>
                      )
                    }
                    return (
                      <div key={data.product.id + attribute.id}>
                        <p className={`${styles["singleproduct__properties"]} ${styles["mt-md"]}`}>{attribute.name}</p>
                        <div className={`${styles["singleproduct__properties-items"]}`}>

                          {attribute.items.map((attributeItem) => {
                          return (                          
                            <div key={data.product.id + attributeItem.id}>
                              <input type="radio" name={data.product.id + attribute.name} id={attribute.name + attributeItem.id} value={attributeItem.value}/>
                              <label for={attribute.name + attributeItem.id}>
                              <button type="button" className={`${styles["singleproduct__properties-btn"]}`} id={attribute.name + attributeItem.id}>{attributeItem.value}</button>
                              </label>
                            </div>
                          )})}
                        </div>
                      </div>
                  )})}  

                  <p className={`${styles["singleproduct__properties"]} ${styles["mt-md"]}`}>PRICE:</p>
                  <p className={`${styles["singleproduct__price"]}`}>
                    {this.props.activeCurrency.label ? (
                      <>
                        {this.props.activeCurrency.symbol + " "}   
                        {data.product.prices.find((el) => {
                         return el.currency.label === this.props.activeCurrency.label;
                        }).amount} 
                      </>
                      ) : (
                      <>
                      $ {data.product.prices[0].amount}
                      </>                      
                    )}                    
                  </p>
                  <button                     
                    onClick={data.product.inStock === true ? () => this.props.addProduct(data.product) : null}   
                    type="submit" 
                    className={`${styles["singleproduct__submit"]} ${styles["mt-xs"]}`} 
                    style={data.product.inStock === false ? {backgroundColor: "#000000", cursor: "auto"} : null}
                    >
                    {data.product.inStock === true ? "ADD TO CART" : "Product currently not available"}                    
                    </button>                
                </div>                
              </section>
            );
          }}
        </Query>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);