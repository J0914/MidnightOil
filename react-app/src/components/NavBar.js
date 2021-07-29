
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import styles from './css-modules/navbar.module.css';

const NavBar = () => {
  return (
    <nav id={styles.nav}>
      <span id={styles.nav_span}>
          <NavLink to='/' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Home
          </NavLink>
          <NavLink to='/login' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Sign Up
          </NavLink>
          <LogoutButton />
      </span>
    </nav>
  );
}

export default NavBar;
