import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { getCategories } from "../../queries/queries";
import { NavLink } from "react-router-dom";
import styles from "./HeaderNav.module.scss";
import { connect, useDispatch } from "react-redux";
import { setActiveCategory } from "../../redux/appSlice";


class HeaderNav extends Component {

  render() {

    return (  
      <>
        <ul className={styles.header__nav}>
          <Query query={getCategories}>
            {({ loading, data }) => {
              if (loading) return "...loading";
              return data.categories.map(({ name }) => (                
                <li key={name} className={styles["header__nav-item"]}>
                <NavLink 
                  to={`/category/${name}`} 
                  className={({ isActive }) => (isActive ? styles["header__link-active"] : styles["header__link"])}
                  onClick={() => this.props.setActiveCategory(name)}                  
                  >
                  {name}
                </NavLink>
                </li>
              ));
            }}
          </Query>
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const activeCategory = state.rootReducer.categories.activeCategory;
  return {
    activeCategory,
  };
};

const mapDispatchToProps = {
  setActiveCategory,  
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);



