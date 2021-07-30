
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import styles from '../../css-modules/navbar.module.css';

const NavBar = () => {
  return (
    <nav id={styles.nav}>
          <NavLink to='/profile' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Home
          </NavLink>
          <LogoutButton />
    </nav>
  );
}

export default NavBar;
