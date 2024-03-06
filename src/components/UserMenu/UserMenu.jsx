import { logOut } from '../../redux/operations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { DefaultBtn } from '../DefaultBtn/DefaultBtn';

export function UserMenu() {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector(selectAuth);

  return (
    <>
      <b style={{ marginRight: '10px' }}>Welcome, {name}</b>
      <DefaultBtn onClick={() => dispatch(logOut())}>Logout</DefaultBtn>
    </>
  );
}
