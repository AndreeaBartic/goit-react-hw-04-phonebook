import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import FilterContacts from './FilterContacts';

export const App = () => {
  const [phoneBook, setPhoneBook] = useState({
    contacts: [],
    filter: '',
  });

  useEffect(() => {
    const storedPhoneBook = localStorage.getItem('phoneBook');
    if (storedPhoneBook) {
      setPhoneBook(JSON.parse(storedPhoneBook));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phoneBook', JSON.stringify(phoneBook));
  }, [phoneBook]);

  const addContact = newContact => {
    setPhoneBook(prevPhoneBook => ({
      ...prevPhoneBook,
      contacts: [...prevPhoneBook.contacts, newContact],
    }));
  };
  const removeContact = contactId => {
    setPhoneBook(prevPhoneBook => ({
      ...prevPhoneBook,
      contacts: prevPhoneBook.contacts.filter(
        contact => contact.id !== contactId
      ),
    }));
  };
  const handleFilterChange = e => {
    setPhoneBook(prevPhoneBook => ({
      ...prevPhoneBook,
      filter: e.target.value,
    }));
  };

  const getFilteredContacts = () => {
    const { contacts, filter } = phoneBook;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <FilterContacts value={phoneBook.filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onRemoveContact={removeContact}
      />
    </div>
  );
};
