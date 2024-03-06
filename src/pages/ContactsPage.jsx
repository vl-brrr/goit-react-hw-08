import { ContactList } from '../components/ContactList/ContactList.jsx';
import { SearchBox } from '../components/SearchBox/SearchBox';
import { fetchContacts } from '../redux/operations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContactsLoading,
  selectContactsError,
  selectVisibleContacts,
} from '../redux/selectors.js';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { Loader } from '../components/Loader/Loader';
import Container from '../components/Container/Container.jsx';
import { PageTitle } from '../components/PageTitle/PageTitle';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <PageTitle>Contacts</PageTitle>
      <SearchBox />
      {visibleContacts.length > 0 && !loading && !error && <ContactList />}
      {visibleContacts.length <= 0 && !loading && !error && (
        <b>There is no contact with that name or number.</b>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </Container>
  );
}
