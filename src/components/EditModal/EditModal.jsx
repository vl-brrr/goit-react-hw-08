import { useFormik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../redux/operations';
import css from '../ContactForm/ContactForm.module.css';
import { selectContacts } from '../../redux/selectors';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MdPhone } from 'react-icons/md';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const EditModal = ({ closeModal, contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field is required.'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field is required.'),
  });

  const formik = useFormik({
    initialValues: { name: name, number: number },
    validationSchema: contactSchema,
    onSubmit: values => {
      const existedContact = contacts.find(contact => {
        return (
          contact.id !== id &&
          (contact.name.toLowerCase() === values.name.toLowerCase() ||
            contact.number === values.number)
        );
      });
      if (existedContact) {
        toast.error('There is already a contact with that name or number.');
        return;
      }
      console.log(existedContact);

      dispatch(editContact({ ...values, id })).then(() => {
        return toast.success('Сhanges are saved');
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={css.form} autoComplete="off">
      <div
        className={css.fieldBox}
        style={{
          marginBottom: '12px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            name="name"
            defaultValue={name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: '#BF9039' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
      <div
        className={css.fieldBox}
        style={{
          marginBottom: '18px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            id="number"
            label="Number"
            variant="standard"
            name="number"
            defaultValue={number}
            placeholder="Exp.: 642-56-24"
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdPhone
                    size={24}
                    style={{
                      fill: '#BF9039',
                      marginTop: '4px',
                      marginBottom: '4px',
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button onClick={closeModal} variant="contained" color="secondary">
          Cancel
        </Button>
      </Stack>
    </form>
  );
};
