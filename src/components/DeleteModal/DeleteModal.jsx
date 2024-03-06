import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';

export function DeleteModal({ closeModal, id }) {
  const dispatch = useDispatch();

  return (
    <>
      <p
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          fontSize: '20px',
        }}
      >
        Are you sure?
      </p>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            return dispatch(deleteContact(id)).then(() =>
              toast.success('The contact was successfully deleted.')
            );
          }}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button onClick={closeModal} variant="contained" color="secondary">
          Cancel
        </Button>
      </Stack>
    </>
  );
}
