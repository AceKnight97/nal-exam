import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import _ from 'lodash';

import { useUpdateEffect } from '../../../utils/hooks';
import BoxItem from '../../ui/boxItem';

// const { EmptyTableMes } = MessageData;
const EmptyTableMes = undefined;

const TableBasic = (props) => {
  const tmpCurrentPage = useRef(1);
  const shouldIncreasePage = useRef(false);

  const onClickNext = () => {
    if (!props.shouldShowAllData) {
      tmpCurrentPage.current = props.page + 1;
      if (tmpCurrentPage.current > Math.ceil(props.totalData.length / 10)) {
        shouldIncreasePage.current = true;
        if (['notification', 'monthly'].includes(props.name)) {
          props.fetchData(
            { reportCursor: props.totalData[props.totalData.length - 1]._id },
            true,
          );
        } else if (props.name === 'appointments') {
          props.fetchData(
            { carePlanCursor: props.totalData[props.totalData.length - 1]._id },
            true,
          );
        } else {
          props.fetchData(
            { cursor: props.totalData[props.totalData.length - 1]._id },
            true,
          );
        }
      } else {
        props.handleChangePage(tmpCurrentPage.current);
      }
    }
  };

  useUpdateEffect(() => {
    if (shouldIncreasePage.current && props.page < Math.ceil(props.totalData.length / 10)) {
      shouldIncreasePage.current = false;
      props.handleChangePage(tmpCurrentPage.current);
    } else {
      tmpCurrentPage.current = props.page;
    }
  }, [props.totalData]);

  const onChangePage = (page) => {
    props.handleChangePage(page);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const shorthandOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
    if (!_.isEmpty(sorter) && !_.isEmpty(props.sorter)
      && (sorter.field !== props.sorter.field || shorthandOrder !== props.sorter.order)) {
      props.fetchData({ sortField: sorter.field, sortOrder: shorthandOrder });
    }
  };

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      if (props.page === 1) {
        return null;
      }
      return originalElement;
    }
    if (type === 'next') {
      if (props.shouldShowAllData && props.page === Math.ceil(props.totalData.length / 10)) {
        return null;
      }
      return !props.shouldHideNextButton && (
        <BoxItem icon={(<RightOutlined className="color-gray-8" />)} onClick={onClickNext} />
      );
    }
    return originalElement;
  };

  return (
    <Table
      rowKey={props.rowKey}
      className={classnames(props.className, `${props.name}-table-wrapper`)}
      dataSource={props.totalData}
      onRow={(record, rowIndex) => ({
        onClick: (e) => {
          const cellText = document.getSelection();
          if (cellText.type === 'Range') {
            e.stopPropagation();
          } else {
            props.onRowClick(rowIndex, record);
          }
        },
      })}
      pagination={props.isNoPagination ? false : {
        itemRender,
        onChange: onChangePage,
        current: props.page,
        showSizeChanger: false,
        showTotal: total => `${(props.page - 1) * 10 + 1}-${props.page * 10 > total ? total : props.page * 10} of total ${total} customer${total > 1 ? 's' : ''}`,
      }}
      locale={{ emptyText: props.emptyText }}
      columns={props.columns}
      loading={props.loading}
      onChange={props.shouldShowAllData ? undefined : handleTableChange}
      sticky={props.sticky}
      bordered
    />
  );
};

TableBasic.defaultProps = {
  name: '',
  className: undefined,
  onRowClick: () => { },
  shouldHideNextButton: false,
  fetchData: () => { },
  loading: false,
  sorter: {},
  emptyText: EmptyTableMes,
  shouldShowAllData: false,
  handleChangePage: () => { },
  isNoPagination: false,
  page: 1,
  sticky: false,
};

TableBasic.propTypes = {
  rowKey: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  totalData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onRowClick: PropTypes.func,
  shouldHideNextButton: PropTypes.bool,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
  sorter: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  emptyText: PropTypes.string,
  shouldShowAllData: PropTypes.bool,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  isNoPagination: PropTypes.bool,
  sticky: PropTypes.bool,
};

export default TableBasic;
