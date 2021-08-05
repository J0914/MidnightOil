import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import NotebooksDropdownMenu from '../NotebooksDropdownMenu';
import DecksDropdownMenu from '../DecksDropdownMenu'

import styles from '../../css-modules/navbar.module.css';

const NavBar = () => {
  const location = useLocation();

  return location.pathname !== '/' && (
    <nav id={styles.nav}>
      <div className={styles.nav_container}>
          <NavLink to='/profile' exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Profile
          </NavLink>
          <NotebooksDropdownMenu />
          <div id={styles.logo_div}>
              <img id={styles.logo}src="https://i.ibb.co/RH80yCG/Midnight-Oil-Logo-No-Words-Transparent.png" alt="logo"/>
          </div>
          <DecksDropdownMenu />
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
