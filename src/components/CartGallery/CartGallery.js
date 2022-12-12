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
    let index = this.state.galleryIndex;
    index -= 1;
    if (index === -1) {
      index = this.props.data.length - 1;
    }
    this.setState(() => ({ galleryIndex: index }));
  }

  nextImage() {
    let index = this.state.galleryIndex;
    index += 1;
    if (index === this.props.data.length) {
      index = 0;
    }
    this.setState(() => ({ galleryIndex: index }));
  }

  render() {
    return (
      <>
        <img 
          src={this.props.data[this.state.galleryIndex]}
          alt="image" 
          className={`${styles["cart__pictures-img"]}`}
        />
        {this.props.data.length > 1 ? (
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