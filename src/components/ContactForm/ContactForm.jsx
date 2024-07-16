import { Component } from 'react';
import styles from './ContactForm.module.css';
import propTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleContact = event => {
    event.preventDefault();
    this.props.handleNewContact(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleContact} className={styles.wrapper}>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <h3>Number</h3>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  handleNewContact: propTypes.func,
};

export default ContactForm;
