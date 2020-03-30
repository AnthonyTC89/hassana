import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import Modal from 'react-awesome-modal';
import 'bootstrap/dist/css/bootstrap.css';

const RecipesModal = (props) => {
  const { recipes, modalVisible, closeModal } = props;
  const size = '80%';
  const header = `Coleccion de Imagenes (${recipes.length})`;
  return (
    <Modal visible={modalVisible} width={size} height={size} onClickAway={() => closeModal(null)}>
      <div className="container">
        <h2>{header}</h2>
        <div className="row">
          {recipes.map((i) => (
            <div key={uuidv4()} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <button onClick={() => closeModal(i)} type="button">
                <img className="img-button" src={i.location} alt={i.key} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => closeModal(null)}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

RecipesModal.propTypes = {
  recipes: PropTypes.array.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RecipesModal;
