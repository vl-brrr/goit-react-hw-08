import { ContactList } from './components/ContactList/ContactList';
import { SearchBox } from './components/SearchBox/SearchBox';
import { ContactForm } from './components/ContactForm/ContactForm';
import { fetchContacts } from './redux/operations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContactsLoading,
  selectContactsError,
  selectFilteredContacts,
} from './redux/selectors.js';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { Loader } from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {filteredContacts.length > 0 && !loading && !error && <ContactList />}
      {filteredContacts.length <= 0 && !loading && !error && (
        <b>There is no contact with that name</b>
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
