import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;

export const selectContactsLoading = state => state.contacts.loading;

export const selectContactsError = state => state.contacts.error;

export const selectFilter = state => state.filters.name;

export const selectContactsNames = createSelector([selectContacts], contacts =>
  contacts.map(contact => contact.name)
);

export const selectContactsPhones = createSelector([selectContacts], contacts =>
  contacts.map(contact => contact.phone)
);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  }
);
