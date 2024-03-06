import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;

export const selectContactsLoading = state => state.contacts.loading;

export const selectContactsError = state => state.contacts.error;

export const selectFilter = state => state.filters.name;

export const selectAuth = state => state.auth;

export const selectContactsNames = createSelector([selectContacts], contacts =>
  contacts.map(contact => contact.name)
);

export const selectContactsPhones = createSelector([selectContacts], contacts =>
  contacts.map(contact => contact.phone)
);

export const selectFilteredContacts = state => state.contacts.filteredItems;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter, selectFilteredContacts],
  (contacts, filter, filteredContacts) => {
    if (filter !== '') {
      return filteredContacts;
    }
    return contacts;
  }
);
