import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { CONFIRMATION_LAYOUT_TYPES } from '../../../constants';

const {
  SAVE_CONTRACT_LACK_OF_DATA,
} = CONFIRMATION_LAYOUT_TYPES;

const ConfirmationLayout = (props) => {
  let title;
  let content;
  let leftBtnTitle;
  let rightBtnTitle;
  let isDanger = false;
  switch (props.type) {
    case SAVE_CONTRACT_LACK_OF_DATA: {
      title = 'Save this contract?';
      content = 'There is still some row not full-filled yet and it will not be saved with your contract. Are you sure you want to continue without saving the incomplete information?';
      leftBtnTitle = 'Cancel';
      rightBtnTitle = 'Continue';
      break;
    }
    case 'temp': {
      title = 'Cancel appointment';
      content = props.message;
      leftBtnTitle = 'No';
      rightBtnTitle = 'Yes';
      isDanger = true;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <Modal className="modal-send-report" visible={props.visible} closable={false} footer={null} destroyOnClose centered>
      <div className={classnames('confirmation-layout-wrapper', props.className)}>
        <div className="confirmation-layout-body">
          <div className="cl-body-row">
            {props.icon ? (
              props.icon
            ) : (
              <QuestionCircleOutlined className="row-icon" />
            )}
            <div className="row-title">
              <span>{title}</span>
            </div>
          </div>
          <div className="cl-body-content">
            <span>{content}</span>
          </div>
        </div>
        <div className="confirmation-layout-footer">
          <div className="cl-footer-buttons">
            <Button className="mr-8" onClick={props.toggleClick} disabled={props.loading}>
              {leftBtnTitle}
            </Button>
            <Button type="primary" danger={isDanger} onClick={props.onClick} loading={props.loading}>
              {rightBtnTitle}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
ConfirmationLayout.defaultProps = {
  className: undefined,
  type: SAVE_CONTRACT_LACK_OF_DATA,
  loading: false,
  icon: undefined,
  visible: false,
  message: '',
};
ConfirmationLayout.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  toggleClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  message: PropTypes.string,
};
export default ConfirmationLayout;
