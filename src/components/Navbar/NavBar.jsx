import Container from '../Container/Container';
import css from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthMenu } from '../AuthMenu/AuthMenu';

export default function Navbar() {
  const { isLoggedIn } = useSelector(selectAuth);
  return (
    <header className={css.header}>
      <Container className={css.wrapper}>
        <Navigation />

        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </Container>
    </header>
  );
}
