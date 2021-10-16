
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { TOP_UP_AMOUNTS } from '../../../constants/myCustomer';
import CustomTable from '../customTable';
import NormalCell from '../../ui/normalCell';
import { NORMAL_CELL_TYPES } from '../../../constants';


const TopUpTable = (props) => {
  const {
    className, name, handleSave, data, type, handleDeleteRow, handleAddMore,
  } = props;
  const editable = ['ADD', 'EDIT'].includes(type);

  const defaulColumns = [
    {
      title: 'Amount (Euro)',
      dataIndex: 'chargeAmount',
      editable,
      editType: 'SELECT',
      placeholder: 'Choose top-up amount',
      selectData: TOP_UP_AMOUNTS,
      // width: '25%',
    },
    {
      title: 'Purchased date',
      dataIndex: 'paidAt',
      // editable,
      editType: 'DATE',
      type: 'CUSTOM',
      // width: '25%',
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
    <div className={classnames('top-up-table', className)}>
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
TopUpTable.defaultProps = {
  name: '',
  className: '',
  type: '',
  data: [],
  handleSave: () => {},
  handleDeleteRow: () => {},
  handleAddMore: () => {},
};
TopUpTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
  handleDeleteRow: PropTypes.func,
  handleAddMore: PropTypes.func,
};
export default TopUpTable;
