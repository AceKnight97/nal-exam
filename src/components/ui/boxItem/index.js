import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { useMergeState } from '../../Helpers/customHooks';

const BoxItem = (props) => {
  // const [state, setState] = useMergeState({
  //   data: [],
  // });

  const {
    className, icon, value, onClick,
  } = props;

  return (
    <button className={classnames('box-item-wrapper', className)} onClick={onClick}>
      {icon || null}
      {value ? <span>{value}</span> : null}
    </button>
  );
};
BoxItem.defaultProps = {
  className: '',
  icon: {},
  value: '',
  onClick: () => {},
};
BoxItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.shape(),
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default BoxItem;
