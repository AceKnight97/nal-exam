
import { Form, Input, Table } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import DatepickerCT from '../../inputs/datePickerCT';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title, editable, children, dataIndex, record, handleSave, ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if (editing) {
      switch (title) {
        case 'Purchased date':
          childNode = (
            <Form.Item
              className="editing-input-cell"
              name={dataIndex}
              rules={[
                {
                  // required: true,
                  // message: `${title} is required.`,
                },
              ]}
            >
              <DatepickerCT
                ref={inputRef}
                onChange={save}
                onBlur={save}
              />
            </Form.Item>
          );
          break;
        default:
          childNode = (
            <Form.Item
              className="editing-input-cell"
              name={dataIndex}
              rules={[
                {
                  // required: true,
                  // message: `${title} is required.`,
                },
              ]}
            >
              <Input
                ref={inputRef}
                onPressEnter={save}
                onBlur={save}
              />
            </Form.Item>
          );
          break;
      }
    } else {
      childNode = (
        <button
          className="editable-cell-value-wrap pr-24"
          onClick={toggleEdit}
        >
          {children}
        </button>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

const TopUpTable = (props) => {
  const {
    className, dataSource, name,
  } = props;

  const handleSave = (row) => {
    props.handleSave(row, name);
  };

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
        handleSave,
      }),
    };
  });

  return (
    <div className={classnames('editable-table', className)}>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
TopUpTable.defaultProps = {
  name: '',
  className: '',
  columns: [],
  dataSource: [],
  handleSave: () => {},
};
TopUpTable.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape()),
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  handleSave: PropTypes.func,
};
export default TopUpTable;
