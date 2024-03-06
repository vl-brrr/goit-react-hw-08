import { Navigate } from 'react-router-dom';
import { selectAuth } from './redux/selectors';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useSelector(selectAuth);
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
