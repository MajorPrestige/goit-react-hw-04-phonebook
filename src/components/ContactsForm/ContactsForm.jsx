import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactsForm.module.css';

function ContactsForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const onInputChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;

      case 'number':
        setNumber(target.value);
        break;

      default:
        return;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <label className={s.label} htmlFor={inputNameId}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInputChange}
          id={inputNameId}
        />
      </label>

      <label className={s.label} htmlFor={inputNumberId}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onInputChange}
          id={inputNumberId}
        />
      </label>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactsForm;
ContactsForm.propTypes = {
  onSubmit: PropTypes.func,
};
