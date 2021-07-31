import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import NotebooksDropdownMenu from '../NotebooksDropdownMenu';
import DecksDropdownMenu from '../DecksDropdownMenu'

import styles from '../../css-modules/navbar.module.css';

const NavBar = () => {

  return (
    <nav id={styles.nav}>
      <div className={styles.nav_container}>
          <NavLink to='/profile' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Home
          </NavLink>
          <NotebooksDropdownMenu />
          <DecksDropdownMenu />
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
