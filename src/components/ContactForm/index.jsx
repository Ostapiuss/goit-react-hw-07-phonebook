import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addContact } from 'store/thunks/phonebookThunk'

import { contactSelector } from '../../store/selectors';

import { nanoid } from "nanoid";

import './style.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: ''
  });

  const contacts = useSelector(contactSelector.getContact);
  const dispatch = useDispatch();

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  const isTheSameNameInCollection = (name) => {
    return contacts.some((contact) => contact.name.trim().toLowerCase() === name.toLowerCase().trim());
  }

  const onAddContact = () => {
    if (formData.name.length <= 0) {
      alert(`The length should me greater than 0 symbols`);
      return null;
    }

    if (isTheSameNameInCollection(formData.name)) {
      alert(`${formData.name} is already in contacts`);
      return null;
    }

    const newContact = {
      ...formData,
      id: nanoid()
    }

    dispatch(addContact(newContact))
  }

  const onChange = (event) => {
    const { value, name } = event.target;

    if (name === 'number') {
      setFormData({...formData, [name]: formatPhoneNumber(value) });
      return null;
    }

    setFormData({...formData, [name]: value });
  }

  return (
    <div className="form">
      <div className="form__name name">
        <label htmlFor="form-name">Name</label>
        <input
          id="form-name"
          type="text"
          name="name"
          className="name__field"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          value={formData.name}
          onChange={onChange}
          required
        />
      </div>
      <div className="form__number number">
        <label htmlFor="form-number">Number</label>
        <input
          id="form-number"
          type="tel"
          name="number"
          className="number__field"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={formData.number}
          onChange={onChange}
          required
        />
      </div>
      <button className="form__button" onClick={onAddContact}>
        Add contact
      </button>
    </div>
  );
}

export default ContactForm;
