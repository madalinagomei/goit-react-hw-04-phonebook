import { Component } from 'react';
import ContactListItem from '../ContactListItem/ContactListItem';
import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';
import propTypes from 'prop-types';

class ContactList extends Component {
  render() {
    const { contacts, deleteContact } = this.props;
    return (
      <>
        <ul className={styles.wrapperList}>
          {contacts.map(contact => (
            <ContactListItem
              id={contact.id}
              name={contact.name}
              number={contact.number}
              key={nanoid()}
              deleteContact={deleteContact}
            />
          ))}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: propTypes.array,
  deleteContact: propTypes.func,
};

export default ContactList;
