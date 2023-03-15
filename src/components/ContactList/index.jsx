import { useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";

import { fetchContactsList, deleteContact } from "../../store/thunks/phonebookThunk";

import { contactSelector } from '../../store/selectors';

import './style.scss';

const ContactList = () => {
  const contacts = useSelector(contactSelector.getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsList());
  }, [dispatch])

  const onDeleteContact = (id) => {
    dispatch(deleteContact(id));
  }

  return (
    <ul className="contact-list">
      {
        contacts.map((contact) => (
          <li className="contact-list__contact contact" key={contact.id}>
            <span>{contact.name}: {contact.number}</span>
            <button className="contact__delete-button" onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  );
}

export default ContactList;
