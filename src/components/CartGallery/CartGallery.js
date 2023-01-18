import React from 'react';
import leftArrow from '../../images/left_arrow.svg';
import rightArrow from '../../images/right_arrow.svg';
import styles from './CartGallery.module.scss'

class CartGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryIndex: 0,
    };
  }

  previousImage() {
    const galleryLength = this.props.data.gallery.length - 1;
    if (this.state.galleryIndex === 0) {
      this.setState({ galleryIndex: galleryLength });
    } else {
      this.setState((prev) => ({ galleryIndex: prev.galleryIndex - 1 }));
    }
  }

  nextImage() {
    const galleryLength = this.props.data.gallery.length - 1;
      if (this.state.galleryIndex === galleryLength) {
        this.setState({ galleryIndex: 0 });
      } else {
        this.setState((prev) => ({ galleryIndex: prev.galleryIndex + 1 }));
      }   
  }

  render() {
    return (
      <>
        <img 
          src={this.props.data.gallery[this.state.galleryIndex]}
          alt={this.props.data.name} 
          className={`${styles["cart__pictures-img"]}`}
        />
        {this.props.data.gallery.length > 1 ? (
          <div className={`${styles["cart__switch-wrap"]}`}>
            <button
              className={`${styles["cart__switch-btn"]}`}
              type="button"
              onClick={() => this.previousImage()}
            >
              <img src={leftArrow} alt="previous"/> 
            </button>
            <button
              className={`${styles["cart__switch-btn"]}`}
              type="button"
              onClick={() => this.nextImage()}
            >
              <img src={rightArrow} alt="next"/>
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

export default CartGallery;