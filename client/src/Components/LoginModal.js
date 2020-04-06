import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';
import Login from '../Containers/Login';
import 'bootstrap/dist/css/bootstrap.css';

const LoginModal = (props) => {
  const { modalVisible, closeModal } = props;
  const width = '50%';
  const height = '25%';
  return (
    <Modal visible={modalVisible} width={width} height={height} onClickAway={() => closeModal()}>
      <Login />
    </Modal>
  );
};

LoginModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
