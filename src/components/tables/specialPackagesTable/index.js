
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import React from 'react';
import { NORMAL_CELL_TYPES } from '../../../constants';
import { PACKAGE_NAMES, PRICE_PER_USER } from '../../../constants/myCustomer';
import NormalCell from '../../ui/normalCell';
import CustomTable from '../customTable';


const SpecialPackagesTable = (props) => {
  const {
    className, name, handleSave, data, type, handleDeleteRow, handleAddMore, specialPackageTitleData,
  } = props;
  // console.log({ specialPackageTitleData });
  const titles = _.map(specialPackageTitleData, x => x.label);
  const editable = ['ADD', 'EDIT'].includes(type);

  const defaulColumns = [
    {
      title: 'Title',
      dataIndex: 'name',
      editable,
      editType: 'SELECT',
      placeholder: 'Choose a service',
      // selectData: PACKAGE_NAMES,
      selectData: titles,
    },
    {
      title: 'Price (Euro per package)',
      dataIndex: 'chargeAmount',
      placeholder: 'Choose a service',
      render: (cell, row) => {
        console.log({ row });
        return (
          <NormalCell cell={cell} />
        );
      },
    },
    {
      title: 'Amount (Packages)',
      dataIndex: 'quantity',
      editable,
      inputType: 'NUMBER',
    },
    {
      title: 'Total price (Euro)',
      dataIndex: 'temp',
      type: 'CUSTOM',
      render: (cell, row) => (
        <NormalCell cell={row?.chargeAmount && row?.quantity ? (row.chargeAmount * row.quantity).toFixed(2) : '0.00'} />// row?.chargeAmount * row?.quantity
      ),
    },
    {
      title: 'Purchased date',
      dataIndex: 'paidAt',
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
    <div className={classnames('special-packages-table', className)}>
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
SpecialPackagesTable.defaultProps = {
  name: '',
  className: '',
  type: '',
  data: [],
  handleSave: () => {},
  handleDeleteRow: () => {},
  handleAddMore: () => { },
  specialPackageTitleData: [],
};
SpecialPackagesTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
  handleDeleteRow: PropTypes.func,
  handleAddMore: PropTypes.func,
  specialPackageTitleData: PropTypes.arrayOf(PropTypes.shape()),
};
export default SpecialPackagesTable;
