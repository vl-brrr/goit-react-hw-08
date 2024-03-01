import { Contact } from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(contact => (
        <Contact contact={contact} key={contact.id} />
      ))}
    </ul>
  );
};
