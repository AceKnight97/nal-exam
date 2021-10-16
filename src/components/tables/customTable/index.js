
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { showSuccessMsg } from '../../../utils';
import DatepickerCT from '../../inputs/datePickerCT';
import InputCT from '../../inputs/inputCT';
import SelectCT from '../../inputs/selectCT';
import SelectPhoneNumber from '../phoneNumberTable/selectPhoneNumber';
import { checkFullLastRow } from './helper';


const CustomTable = (props) => {
  const handlAddnew = useRef(undefined);
  const {
    className, dataSource, name, handleAddMore,
  } = props;

  const columns = _.map(props.columns, (col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        // handleSave,
      }),
    };
  });

  const handleAddRow = () => {
    if (handlAddnew.current) {
      clearTimeout(handlAddnew.current);
    }
    const tempData = _.cloneDeep(dataSource);
    handlAddnew.current = setTimeout(() => {
      if (checkFullLastRow(tempData, name)) {
        handleAddMore(name);
      }
    }, 300);
  };

  const onChange = (cellName, value, row, index) => {
    const newRow = _.cloneDeep(row);
    _.assign(newRow, { [cellName]: value });
    props.handleSave(newRow, name, index);
  };

  const renderCellDetails = (type = '', data = '', row = {}, render = () => {}, index = 0) => {
    // console.log({ data, type });
    switch (type) {
      case 'ARRAY':
        return _.map(data || [], (x, index) => (
          <span key={index}>{x}</span>
        ));
      case 'CUSTOM':
        return render(data, row, index);
      default:
        return <span>{data}</span>;
    }
  };

  const renderCell = (row, y, index) => {
    const {
      type, dataIndex, editable, editType, placeholder, selectData, render,
      disabled, onBlur, width, inputType, showSearch,
    } = y || {};
    const cell = row?.[dataIndex];
    const cellProps = {
      name: dataIndex,
      value: cell,
      placeholder,
      disabled: disabled ? disabled(cell, row) : undefined,
      onBlur,
      isObject: typeof (selectData?.[0]) === 'object',
      type: inputType,
    };
    // if (editable && editType === 'SELECT') {
    //   console.log({ cell, isObject: cellProps.isObject, selectData });
    // }

    let childNode;
    if (editable) {
      switch (editType) {
        case 'SELECT':
          childNode = (
            <SelectCT
              {...cellProps}
              inputClassName="custom-table-body-row-cell-input"
              data={selectData}
              onChange={(cellName, value) => {
                // console.log({ cellName, value });
                onChange(cellName, value, row, index);
              }}
              showSearch={showSearch}
            />
          );
          break;
        case 'SELECT_PHONE_NUMBER':
          childNode = (
            <SelectPhoneNumber
              cellProps={cellProps}
              onChange={onChange}
              country={row.country}
              row={row}
              index={index}
              countries={selectData}
            />
          );
          break;
        case 'DATE':
          childNode = (
            <DatepickerCT
              {...cellProps}
              className="custom-table-body-row-cell-input"
              onChange={(cellName, value) => {
                onChange(cellName, value, row, index);
              }}
            />
          );
          break;
        case 'CUSTOM':
          childNode = render(cell, row, index);
          break;
        default:
          childNode = (
            <InputCT
              {...cellProps}
              inputClassName="custom-table-body-row-cell-input"
              onChange={(cellName, value) => {
                onChange(cellName, value, row, index);
              }}
            />
          );
          break;
      }
    } else {
      childNode = (
        <div className="custom-table-body-row-cell">
          {renderCellDetails(type, cell || '', row, render, index)}
        </div>
      );
    }

    return childNode;
  };

  // console.log({ dataSource });

  return (
    <div className={classnames('custom-table', className)}>
      <div className="custom-table-header">
        {
          _.map(columns, (x, index) => (
            <div
              key={index}
              style={{ width: x?.width }}
              className={`custom-table-header-item custom-table-col-${columns.length}`}
            >
              <span>{x.title}</span>
            </div>
          ))
        }
      </div>

      <div className="custom-table-body">
        {
          _.map(dataSource, (x, index) => (
            <div key={index} className="custom-table-body-row">
              {
                _.map(columns, (y, index2) => (
                  <div
                    key={index2}
                    style={{ width: y?.width }}
                    className={`custom-table-body-row-item custom-table-col-${columns.length}`}
                  >
                    {renderCell(x, y, index)}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>

      {
        props.editable && (
          <Button
            type="text"
            block
            className="custom-table-footer"
            onClick={handleAddRow}
          >
            <PlusOutlined className="custom-table-footer-plus-ic" />
            <span>Add new row</span>
          </Button>
        )
      }

    </div>
  );
};
CustomTable.defaultProps = {
  name: '',
  className: '',
  columns: [],
  dataSource: [],
  handleSave: () => {},
  handleAddMore: () => { },
  editable: false,
};
CustomTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape()),
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
  handleAddMore: PropTypes.func,
  editable: PropTypes.bool,
};
export default CustomTable;
