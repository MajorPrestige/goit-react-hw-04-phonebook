import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactLists from './ContactsList/ContactList';
import ContactsSearch from './ContactsSearch/ContactsSearch';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => {
      const duplicateContact = contacts.find(
        contact => contact.name === newContact.name
      );

      if (duplicateContact?.name === newContact.name) {
        alert(`${newContact.name} is already in contacts`);
        return [...contacts];
      }

      return [newContact, ...contacts];
    });
  };

  const onCheckboxChange = e => {
    const contactId = e.target.name;
    if (toDelete.includes(contactId)) {
      setToDelete(prevState => [...prevState].filter(el => el !== contactId));
    } else {
      setToDelete(prevState => [...prevState, e.target.name]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const deleteAllContact = () => {
    if (toDelete.length === 0) {
      return alert('Noone contact was checked');
    }

    setToDelete([]);
    setContacts(prevState =>
      prevState.filter(contact => !toDelete.includes(contact.id))
    );
  };

  const filterContact = ({ target }) => {
    setFilter(target.value);
  };

  const filterNormalized = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterNormalized)
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <ContactsForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <ContactsSearch value={filter} filter={filterContact} />
        <ContactLists
          contacts={filterContacts}
          onDeleteClick={deleteContact}
          onCheckboxChange={onCheckboxChange}
          deleteAllContact={deleteAllContact}
          contactsToDelete={toDelete}
        />
      </div>
    </>
  );
}
