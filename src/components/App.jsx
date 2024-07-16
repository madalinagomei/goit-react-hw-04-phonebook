import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
        { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
        { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
        { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.state.contacts.some(
      i => i.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm handleNewContact={this.handleNewContact} />
        <h2>Contacts</h2>
        <Filter handleFilterChange={this.handleFilterChange} filter={filter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
