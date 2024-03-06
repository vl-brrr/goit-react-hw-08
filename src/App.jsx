import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './redux/selectors';
import { refreshUser } from './redux/operations';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import NavBar from './components/Navbar/NavBar';
import { Toaster } from 'react-hot-toast';

function App() {
  const Home = lazy(() => import('./pages/HomePage'));
  const Register = lazy(() => import('./pages/RegisterPage'));
  const Login = lazy(() => import('./pages/LoginPage'));
  const Contacts = lazy(() => import('./pages/ContactsPage'));

  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuth).isRefreshing;

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <Toaster position="top-center" />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" component={<Register />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" component={<Login />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={<Contacts />} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
