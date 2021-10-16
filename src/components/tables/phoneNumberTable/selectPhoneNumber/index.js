import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { PHONE_NUMBER_TYPES } from '../../../../constants/myCustomer';
import { useMergeState } from '../../../../utils/hooks';
import InputCT from '../../../inputs/inputCT';
import { queryPhoneNumbers } from './helper';


const SelectPhoneNumber = (props) => {
  const wrapperRef = useRef(undefined);
  const timeoutRef = useRef(undefined);
  const [state, setState] = useMergeState({
    selectData: [],
    searchText: '',
    isVisibledDropdown: false,
  });

  const {
    className, cellProps, country, onChange, row, index, countries,
  } = props;

  const getPhoneNumbers = async (searchText = '') => {
    const stateObject = await queryPhoneNumbers(searchText, country, countries, state);
    setState(stateObject);
  };

  const disabled = !country || row.type !== PHONE_NUMBER_TYPES.MANUAL;

  useEffect(() => {
    // console.log('new type: ', row.type);
    if (row.type === PHONE_NUMBER_TYPES.RANDOM) {
      setState({ selectData: [], searchText: '' });
    }
    if (!disabled) {
      // console.log('new country: ', country);
      getPhoneNumbers();
    }
  }, [props.country, row.type]);

  const handleClickOutside = (event) => {
    // console.log({ res: wrapperRef.current?.contains(event.target), wrapperRef: wrapperRef.current });
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
      setState({ isVisibledDropdown: false });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const {
    selectData, isVisibledDropdown, searchText,
  } = state;

  const onToggleClickDropdown = () => {
    setState({ isVisibledDropdown: !isVisibledDropdown });
  };

  const onChangeCheckBox = (item = {}, e) => {
    _.assign(item, { isCheck: e?.target?.checked });
    const checkedPhoneNumbers = _.filter(state.selectData, x => x.isCheck);
    // console.log({ checkedPhoneNumbers });
    onChange(cellProps.name, checkedPhoneNumbers, row, index);
    setState({ selectData });
  };

  const onChangeSearch = (key, value) => {
    // setState({ searchText: parseInt(value, 10) });
    setState({ searchText: value });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef);
    }
    timeoutRef.current = setTimeout(() => {
      getPhoneNumbers(value);
    }, 400);
  };

  // const cellProps = {
  //   name: dataIndex,
  //   value: cell,
  //   placeholder,
  //   disabled: disabled ? disabled(cell, row) : undefined,
  //   onBlur,
  // };

  // console.log({ selectData });

  const menu = () => (
    <div className="select-phone-number-menu" ref={wrapperRef}>
      <InputCT
        value={searchText}
        name="searchText"
        inputClassName="custom-table-body-row-cell-input"
        onChange={onChangeSearch}
        placeholder="Search"
        absSuffix={<SearchOutlined className="select-phone-number-menu-search-icon" />}
        type="NUMBER"
        // {...cellProps}
        // onChange={(cellName, value) => {
        //   console.log({ cellName, value });
        //   onChange(cellName, value, row, index);
        // }}
      />
      <div className="select-phone-number-menu-boxes">
        {
          _.map(selectData, (x, index) => (
            <Checkbox
              key={index}
              className="select-phone-number-checkbox"
              checked={x?.isCheck}
              disabled={x?.disabled}
              onChange={e => onChangeCheckBox(x, e)}
            >
              {x.label}
            </Checkbox>
          ))
        }
      </div>
    </div>
  );

  return (
    <Dropdown
      overlayClassName="select-phone-number-dropdown"
      overlay={menu}
      visible={isVisibledDropdown}
      disabled={disabled}
      getPopupContainer={trigger => trigger.parentElement}
      // trigger={['hover']}
    >
      <Button
        className={classnames('select-phone-number-button',
          disabled ? 'disabled' : '')}
        onClick={onToggleClickDropdown}
      >
        {`${_.sumBy(selectData, x => (x.isCheck ? 1 : 0)) || 0} selected`}
        <CaretDownOutlined className="select-phone-number-button-arrow" />
      </Button>
    </Dropdown>
  );
};
SelectPhoneNumber.defaultProps = {
  className: '',
  cellProps: {},
  country: '',
  row: {},
  index: 0,
  onChange: () => { },
  countries: [],
};
SelectPhoneNumber.propTypes = {
  className: PropTypes.string,
  cellProps: PropTypes.shape(),
  country: PropTypes.string,
  row: PropTypes.shape(),
  index: PropTypes.number,
  onChange: PropTypes.func,
  countries: PropTypes.arrayOf(PropTypes.shape()),
};

export default SelectPhoneNumber;
