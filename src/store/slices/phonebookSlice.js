import { createSlice } from "@reduxjs/toolkit";
import { fetchContactsList, addContact, deleteContact } from '../thunks/phonebookThunk';

const INITIAL_CONTACT_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ''
}

const phonebookSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_CONTACT_STATE,

  reducers: {
    filterContact(state, { payload: filterValue }) {
      state.filter = filterValue;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContactsList.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContactsList.fulfilled, (state, { payload: contacts }) => {
        state.contacts.items = contacts;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContactsList.rejected, (state, { payload: error }) => {
        state.contacts.isLoading = false;
        state.contacts.error = error;
      })

      .addCase(addContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, { payload: newContact }) => {
        state.contacts.items.push(newContact);
        state.contacts.isLoading = false;
      })
      .addCase(addContact.rejected, (state,{payload: error})=>{
        state.contacts.error = error;
        state.contacts.isLoading = false;
      })

      .addCase(deleteContact.pending, (state) =>{
        state.isLoadingDelete = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload: deletedContactId }) => {
        state.contacts.items = state.contacts.items.filter(contact => contact.id !== deletedContactId);
        state.contacts.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state,{payload})=>{
        state.contacts.error = payload;
        state.contacts.isLoading = false;
      });
  }
});

export const { filterContact } = phonebookSlice.actions;

export default phonebookSlice.reducer;
