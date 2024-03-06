import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, editContact } from './operations';

function handleLoading(state) {
  state.loading = true;
  state.error = null;
}

function handleError(state) {
  state.loading = false;
  state.error = true;
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filteredItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    changeFilteredContacts(state, action) {
      state.filteredItems = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handleLoading)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleError)
      .addCase(addContact.pending, handleLoading)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleError)
      .addCase(deleteContact.pending, handleLoading)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleError)
      .addCase(editContact.pending, handleLoading)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(editContact.rejected, handleError);
  },
});

export const { changeFilteredContacts } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
