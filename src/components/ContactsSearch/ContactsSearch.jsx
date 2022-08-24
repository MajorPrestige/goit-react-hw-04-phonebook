import PropTypes from 'prop-types';
import s from './ContactsSearch.module.css';

const ContactsSearch = ({ filter, value }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input className={s.input} onChange={filter} value={value} type="text" />
    </label>
  );
};

export default ContactsSearch;

ContactsSearch.propTypes = {
  filter: PropTypes.func,
  value: PropTypes.string,
};
