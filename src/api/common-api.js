import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6410f9e595656eab41c67d7e.mockapi.io/contacts',
});

export const getContacts = async () => {
  const { data } = await instance.get('/');

  return data;
};

export const addContact = async user => {
  const { data } = await instance.post('/', user);

  return data;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/${id}`);

  return data;
};
