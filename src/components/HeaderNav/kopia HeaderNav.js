import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { getCategories } from "../../queries/queries";
import { NavLink } from "react-router-dom";
import styles from "./HeaderNav.module.scss";


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
                <NavLink to={`/${name}`} className={styles["header__link"]}>
                  {({ isActive }) => (
                    <span className={ isActive ? styles["bold"] : undefined }>
                      {name}
                    </span>)}                
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

export default HeaderNav;


