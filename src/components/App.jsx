import { useSelector } from 'react-redux';

import { contactSelector } from 'store/selectors';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import { Loading } from 'notiflix/build/notiflix-loading-aio';

import './App.scss'

export const App = () => {
  const loading = useSelector(contactSelector.getLoading);

  return (
    <div className="root-app">
      {loading ? Loading.dots() : Loading.remove()}
      <div className="root-app__phonebook phonebook">
        <div className="phonebook__form">
          <h2 className="phonebook__title">Phonebook</h2>
          <ContactForm />
        </div>
        <h2 className="phonebook__title">Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};
