import { selectContacts, selectFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { useState } from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { DefaultBtn } from '../DefaultBtn/DefaultBtn';
import Fuse from 'fuse.js';
import { changeFilteredContacts } from '../../redux/contactsSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    border: 'none',
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
  },
};

Modal.setAppElement('#root');

export const SearchBox = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const options = {
    keys: ['name', 'number'],
  };

  const fuse = new Fuse(contacts, options);

  function handleChange(event) {
    dispatch(changeFilter(event.target.value));
    let filteredContacts = fuse.search(event.target.value);
    filteredContacts = filteredContacts.map(contact => contact.item);
    dispatch(changeFilteredContacts(filteredContacts));
  }

  return (
    <div className={css.searchBox}>
      <TextField
        size="small"
        name="filter"
        id="filter"
        label="Find contact"
        defaultValue={filter}
        style={{
          marginRight: '10px',
        }}
        onChange={handleChange}
      />

      <DefaultBtn onClick={openModal}>+ Add contact</DefaultBtn>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ContactForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};
