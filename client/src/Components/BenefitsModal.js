import React from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import './BenefitsModal.css';

const BenefitsModal = ({ item, modalVisible, closeModal }) => (
  <Modal visible={modalVisible} width="300" height="90%" onClickAway={closeModal}>
    <div className="benefits-container bg-hassana">
      <button
        className="btn btn-outline-danger btn-modal-close d-sm-none"
        type="button"
        onClick={closeModal}
      >
        x
      </button>
      <img className="item-img" src={item.location} alt={item.key} />
      <h4>Beneficios</h4>
      <ul className="benefits-list">
        {item.benefits.split('. ').map((text) => (
          <li key={uuidv4()} className="list-item">
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  </Modal>
);

BenefitsModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default BenefitsModal;
