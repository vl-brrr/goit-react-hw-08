import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65d9f674bcc50200fcdc5c78.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get('/contacts');
  return response.data;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number: phone }) => {
    const response = await axios.post('/contacts', { name, phone });
    return response.data;
  }
);

export const deleteContact = createAsyncThunk('contacts/deleteContact', async contactId => {
  const response = await axios.delete(`/contacts/${contactId}`);
  return response.data;
});
