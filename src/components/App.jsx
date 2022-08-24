import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactLists from './ContactsList/ContactList';
import ContactsSearch from './ContactsSearch/ContactsSearch';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    contactsToDelete: [],
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => {
      const duplicateContact = contacts.find(
        contact => contact.name === newContact.name
      );

      if (duplicateContact?.name === newContact.name) {
        return alert(`${newContact.name} is already in contacts`);
      }

      return { contacts: [newContact, ...contacts] };
    });
  };

  onCheckboxChange = e => {
    const contactId = e.target.name;
    if (this.state.contactsToDelete.includes(contactId)) {
      this.setState(prevState => {
        return {
          contactsToDelete: [
            ...prevState.contactsToDelete.filter(el => el !== contactId),
          ],
        };
      });
    } else {
      this.setState(prevState => {
        return {
          contactsToDelete: [...prevState.contactsToDelete, e.target.name],
        };
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  deleteAllContact = () => {
    const { contactsToDelete } = this.state;
    if (contactsToDelete.length === 0) {
      return alert('Noone contact was checked');
    }
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => !contactsToDelete.includes(contact.id)
        ),
        contactsToDelete: [],
      };
    });
  };

  filterContact = e => {
    this.setState({ filter: e.target.value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);

    if (parsedContact) {
      this.setState({
        contacts: parsedContact,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter, contactsToDelete } = this.state;

    const filterNormalized = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );

    return (
      <>
        <div>
          <h2>Phonebook</h2>
          <ContactsForm onSubmit={this.formSubmitHandler} />
          <h2>Contacts</h2>
          <ContactsSearch value={filter} filter={this.filterContact} />
          <ContactLists
            contacts={filterContacts}
            onDeleteClick={this.deleteContact}
            onCheckboxChange={this.onCheckboxChange}
            deleteAllContact={this.deleteAllContact}
            contactsToDelete={contactsToDelete}
          />
        </div>
      </>
    );
  }
}
