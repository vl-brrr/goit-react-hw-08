import { Navigate } from 'react-router-dom';
import { selectAuth } from './redux/selectors';
import { useSelector } from 'react-redux';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn } = useSelector(selectAuth);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
