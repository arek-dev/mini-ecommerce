import React from 'react';
import styles from "./Header.module.scss";
import HeaderNav from '../HeaderNav/HeaderNav';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';

class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <HeaderNav />
                
                  <figure className={styles.header__logo}>
                  <Link to="/">
                    <img src={logo} alt="logo" className={styles['header__logo-img']}/>
                  </Link>
                  </figure>
                  <CurrencyDropdown />
                
            </header>
        );
    }
}

export default Header;