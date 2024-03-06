import { MdAccountCircle } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import css from './Contact.module.css';
import Modal from 'react-modal';
import { useState } from 'react';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { EditModal } from '../EditModal/EditModal';

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

export const Contact = ({ contact: { id, name, number } }) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }
  function openEditModal() {
    setEditModalIsOpen(true);
  }
  function handleOnContactClick(event) {
    if (event.target.tagName !== 'BUTTON') {
      openEditModal();
    }
    return;
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
  }

  return (
    <>
      <li className={css.contactField} onClick={handleOnContactClick}>
        <div>
          <div className={css.field}>
            <MdAccountCircle size={20} className={css.icon} />
            <p className={css.fieldInfo}>{name}</p>
          </div>
          <div className={css.field}>
            <MdLocalPhone size={20} className={css.icon} />
            <p className={css.fieldInfo}>{number}</p>
          </div>
        </div>
        <button className={css.button} onClick={openDeleteModal}>
          Delete
        </button>
      </li>
      <Modal isOpen={deleteModalIsOpen} onRequestClose={closeDeleteModal} style={customStyles}>
        <DeleteModal closeModal={closeDeleteModal} id={id} />
      </Modal>
      <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={customStyles}>
        <EditModal closeModal={closeEditModal} contact={{ id, name, number }} />
      </Modal>
    </>
  );
};
