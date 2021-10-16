
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NORMAL_CELL_TYPES } from '../../../constants';
import { PHONE_AMOUNTS_DATA, PHONE_NUMBER_TYPES, TOP_UP_AMOUNTS } from '../../../constants/myCustomer';
import NormalCell from '../../ui/normalCell';
import CustomTable from '../customTable';
import SelectPhoneNumber from './selectPhoneNumber';


const PhoneNumberTable = (props) => {
  const {
    className, name, handleSave, data, type, handleDeleteRow, handleAddMore,
  } = props;
  const editable = ['ADD', 'EDIT'].includes(type);

  const defaulColumns = [
    {
      title: 'Country',
      dataIndex: 'country',
      editable,
      editType: 'SELECT',
      placeholder: 'Choose a country',
      // selectData: TOP_UP_AMOUNTS,
      selectData: props.phoneNumberCountryData,
      showSearch: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      editable,
      editType: 'SELECT',
      placeholder: 'Choose a type',
      selectData: Object.values(PHONE_NUMBER_TYPES),
    },
    {
      title: 'Amount',
      dataIndex: 'quantity',
      editable,
      editType: 'SELECT',
      placeholder: 'Choose a type',
      selectData: PHONE_AMOUNTS_DATA,
      disabled: (cell, row) => row?.type !== PHONE_NUMBER_TYPES.RANDOM,
    },
    {
      title: 'Selected numbers',
      dataIndex: 'phoneNumbers',
      type: 'ARRAY',
      editable,
      editType: 'SELECT_PHONE_NUMBER',
      placeholder: 'Search',
      disabled: (cell, row) => row?.type !== PHONE_NUMBER_TYPES.MANUAL,
      selectData: props.phoneNumberCountryData,
      // render: (cell, row) => {
      //   console.log({ cell, row });
      //   return <SelectPhoneNumber cell={cell} country={row?.country} />;
      // },
    },
    {
      title: 'Purchased date',
      dataIndex: 'createdAt',
      type: 'CUSTOM',
      render: cell => (
        <NormalCell cell={cell} type={NORMAL_CELL_TYPES.DATE} />
      ),
    },
  ];
  if (editable) {
    defaulColumns.push(
      {
        title: '',
        dataIndex: 'deleteButton',
        type: 'CUSTOM',
        render: (cell, row, index) => (
          <Button
            type="text"
            className="delete-bot-row-btn"
            onClick={() => {
              if (data.length === 1) {
                handleSave({ ...row, chargeAmount: undefined }, name, index);
              } else {
                handleDeleteRow(undefined, name, index);
              }
            }}
          >
            <CloseOutlined />
          </Button>
        ),
      },
    );
  } else {
    defaulColumns.push(
      {
        title: 'Status',
        dataIndex: 'status',
      },
    );
  }

  return (
    <div className={classnames('phone-number-table', className)}>
      <CustomTable
        name={name}
        dataSource={data}
        columns={defaulColumns}
        handleSave={handleSave}
        handleAddMore={handleAddMore}
        editable={editable}
      />
    </div>
  );
};
PhoneNumberTable.defaultProps = {
  name: '',
  className: '',
  type: '',
  data: [],
  handleSave: () => {},
  handleDeleteRow: () => {},
  handleAddMore: () => { },
  phoneNumberCountryData: [],
};
PhoneNumberTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
  handleDeleteRow: PropTypes.func,
  handleAddMore: PropTypes.func,
  phoneNumberCountryData: PropTypes.arrayOf(PropTypes.shape()),
};
export default PhoneNumberTable;
