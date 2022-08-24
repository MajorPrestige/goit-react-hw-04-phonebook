import PropTypes from 'prop-types';
import s from './ContactsItem.module.css';

const ContactsItem = ({
  name,
  number,
  id,
  onDeleteClick,
  onCheckboxChange,
}) => {
  return (
    <li className={s.item}>
      <label className={s.item}>
        <input
          style={{ marginRight: '20px' }}
          type="checkbox"
          name={id}
          onChange={onCheckboxChange}
        />
        <p>
          {name}: {number}
        </p>
      </label>
      <button onClick={() => onDeleteClick(id)} type="button">
        Delete
      </button>
    </li>
  );
};

export default ContactsItem;

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func,
};
