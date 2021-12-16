import React from "react";
import Modal from "react-modal";
import PersonForm from "./PostForm";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddPostModal = ({
  modalIsOpen,
  closeModal,
  title,
  body,
  onChange,
  onSubmit,
  formAction,
}) => {
  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <button onClick={closeModal}>x</button>
        <PersonForm
          title={title}
          body={body}
          onChange={onChange}
          onSubmit={onSubmit}
          formAction={formAction}
        />
      </Modal>
    </div>
  );
};

AddPostModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPostModal;
