import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDelete from './ConfirmDelete';
import {BsTrash} from 'react-icons/bs'

import styles from '../../css-modules/deletemodal.module.css'

function DeleteModal({setCurrentId, notebookId, item, setDelete}) {
  const [showModal, setShowModal] = useState(false);

  if (item === 'notebook') {
      setCurrentId(notebookId)
  }

  return (
    <>
      <button id={styles.delete_modal} onClick={() => setShowModal(true)}><BsTrash /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete setShowModal={setShowModal} setDelete={setDelete} item={item} />
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;