import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalImgURL, onClose }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        // console.log('close');
        onClose(modalImgURL);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [modalImgURL, onClose]);
  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener('keydown', handleKeydown);
  //   };
  // }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose(modalImgURL);
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalBox>
        <img src={modalImgURL} alt="" />
      </ModalBox>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImgURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
