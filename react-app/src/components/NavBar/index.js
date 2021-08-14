import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import NotebooksDropdownMenu from '../NotebooksDropdownMenu';
import DecksDropdownMenu from '../DecksDropdownMenu'

import styles from '../../css-modules/navbar.module.css';

const NavBar = () => {
  const [notebooksIsOpen, setNotebooksIsOpen] = React.useState(false);
  const [decksIsOpen, setDecksIsOpen] = React.useState(false);
  const location = useLocation();

  const click = () => {
    setNotebooksIsOpen(false);
    setDecksIsOpen(false);
  }

  return location.pathname !== '/' && (
    <nav id={styles.nav}>
      <div className={styles.nav_container}>
          <NavLink to='/dashboard' onClick={click} exact={true} className={styles.navlink} activeClassName={styles.nav_active}>
            Dashboard
          </NavLink>
          <NotebooksDropdownMenu setIsOpen={setNotebooksIsOpen} isOpen={notebooksIsOpen} setDecksIsOpen={setDecksIsOpen} />
          <div id={styles.logo_div}>
              <img id={styles.logo}src="https://i.ibb.co/RH80yCG/Midnight-Oil-Logo-No-Words-Transparent.png" alt="logo"/>
          </div>
          <DecksDropdownMenu setIsOpen={setDecksIsOpen} isOpen={decksIsOpen} setNotebooksIsOpen={setNotebooksIsOpen} />
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
