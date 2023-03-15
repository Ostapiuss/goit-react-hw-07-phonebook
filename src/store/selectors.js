export const contactSelector = {
  getContact: state => state.phonebook.contacts.items,
  getFilter: state => state.phonebook.contacts.filter,
  getLoading: state =>state.phonebook.contacts.isLoading,
  getFilteredContacts: (state) => {
    return state.phonebook.contacts.items.filter((contact) => contact.name.toLowerCase().includes(state.phonebook.filter.toLowerCase()));
  }
}
