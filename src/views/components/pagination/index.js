import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { Button } from 'antd';


const Pagination = (props) => {
  const {
    className, pages, onClick, current, isEndOfData,
  } = props;
  // console.log({ pages, current, isEndOfData });

  const onClickPrevious = () => {
    onClick(current - 2);
  };
  const onClickPage = (index) => {
    console.log({ current, pages });
    if (current === index + 1) {
      return;
    }
    onClick(index);
  };
  const onClickNext = () => {
    onClick(current);
  };

  return (
    <div className={classnames('pagination', className)}>
      <Button
        // className="ml-12"
        onClick={onClickPrevious}
        disabled={current === 1}
      >
        Previous
      </Button>

      {
        _.map(_.range(0, pages), (x, index) => (
          <Button
            key={x}
            className="ml-12"
            onClick={() => onClickPage(index)}
            type={current === index + 1 ? 'primary' : undefined}
          >
            {index + 1}
          </Button>
        ))
}

      {!isEndOfData && (
      <Button
        className="ml-12"
        onClick={onClickNext}
      >
        Next
      </Button>
      )}
    </div>
  );
};
Pagination.defaultProps = {
  className: '',
  pages: 1,
  onClick: () => { },
  current: 1,
  isEndOfData: false,
};
Pagination.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.number,
  onClick: PropTypes.func,
  current: PropTypes.number,
  isEndOfData: PropTypes.bool,
};

export default Pagination;
