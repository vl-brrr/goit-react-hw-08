import { Contact } from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectVisibleContacts } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.contactList}>
      {visibleContacts.map(contact => {
        return <Contact contact={contact} key={contact.id} />;
      })}
    </ul>
  );
};
