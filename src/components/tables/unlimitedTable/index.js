
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { NORMAL_CELL_TYPES } from '../../../constants';
import { PACKAGE_NAMES, PRICE_PER_USER } from '../../../constants/myCustomer';
import NormalCell from '../../ui/normalCell';
import CustomTable from '../customTable';


const UnlimitedTable = (props) => {
  const {
    className, name, handleSave, data, type, handleDeleteRow, handleAddMore, unlimitedTitleData,
  } = props;

  const titles = useMemo(() => _.map(unlimitedTitleData, x => x.label), unlimitedTitleData);
  // console.log({ data });
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
      title: 'Price (Euro per user)',
      type: 'CUSTOM',
      placeholder: 'Choose a service',
      dataIndex: 'chargeAmount',
      render: (cell, row) => (
        <NormalCell cell={cell} />
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
    <div className={classnames('unlimted-table', className)}>
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
UnlimitedTable.defaultProps = {
  name: '',
  className: '',
  type: '',
  data: [],
  handleSave: () => {},
  handleDeleteRow: () => {},
  handleAddMore: () => { },
  unlimitedTitleData: [],
};
UnlimitedTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
  handleDeleteRow: PropTypes.func,
  handleAddMore: PropTypes.func,
  unlimitedTitleData: PropTypes.arrayOf(PropTypes.shape()),
};
export default UnlimitedTable;
