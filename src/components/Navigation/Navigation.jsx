import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';

export function Navigation() {
  const { isLoggedIn } = useSelector(selectAuth);
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.logo}>
        Phonebook
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={css.navBtn}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
