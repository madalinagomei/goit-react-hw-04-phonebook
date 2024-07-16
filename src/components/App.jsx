import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts
      ? JSON.parse(storedContacts)
      : [
          { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
          { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
          { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
          { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm handleNewContact={handleNewContact} />
      <h2>Contacts</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </>
  );
}
