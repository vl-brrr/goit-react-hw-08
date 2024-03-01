import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import css from './ContactForm.module.css';
import { selectContactsNames, selectContactsPhones } from '../../redux/selectors';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const contactsNames = useSelector(selectContactsNames);
  const contactsPhones = useSelector(selectContactsPhones);

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field is required.'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field is required.')
      .notOneOf(contactsPhones, 'There is already a contact with that phone number.'),
  });
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(values, actions) => {
        const existedContact = contactsNames.find(
          name => name.toLowerCase() === values.name.toLowerCase()
        );
        if (existedContact) {
          toast.error('There is already a contact with that name.');
          return;
        }
        dispatch(addContact({ ...values }));
        actions.resetForm();
      }}
      validationSchema={contactSchema}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.fieldBox}>
          <label htmlFor={nameFieldId}>Name </label> <br />
          <Field className={css.input} name="name" id={nameFieldId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.fieldBox}>
          <label htmlFor={numberFieldId}>Number </label> <br />
          <Field
            className={css.input}
            name="number"
            id={numberFieldId}
            placeholder="Exp.: 642-56-24"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
