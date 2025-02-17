import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({
  id,
  title,
  // eslint-disable-next-line camelcase
  is_complete,
  onClickCallback,
  onDeleteCallback,
}) => {
  // eslint-disable-next-line camelcase
  const buttonClass = is_complete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onClickCallback(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        data-testid={`delete button ${id}`}
        onClick={() => onDeleteCallback(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line camelcase
  is_complete: PropTypes.bool.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
};

export default Task;
