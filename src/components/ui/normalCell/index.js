import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { NORMAL_CELL_TYPES } from '../../../constants';

const {
  DATE, BUTTON,
} = NORMAL_CELL_TYPES;

const NormalCell = (props) => {
  const {
    className, cell, type, onChange,
  } = props;

  let cellCT = cell || '';

  const classNameCT = classnames('normal-cell', className);

  switch (type) {
    case DATE:
      cellCT = cell ? moment(cell).format('MM/DD/YYYY') : '';
      break;
    case BUTTON: {
      return (
        <button
          className="normal-cell-link-name"
          onClick={(e) => {
            e.stopPropagation();
            props.onClick(props._id);
          }}
        >
          <span>{cellCT}</span>
        </button>
      );
    }
    default:
      break;
  }

  return (
    <div className={classNameCT}>
      <span>{cellCT}</span>

    </div>
  );
};

NormalCell.defaultProps = {
  className: undefined,
  cell: '',
  type: 'text',
  onChange: () => { },
  onClick: () => { },
  _id: '',
  isCancel: false,
  isManual: true,
};

NormalCell.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string,
  cell: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.string), PropTypes.shape(),
  ]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isCancel: PropTypes.bool,
  isManual: PropTypes.bool,
};

export default NormalCell;
