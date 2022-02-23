import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDelete from './ConfirmDelete';
import {BsTrash} from 'react-icons/bs'

import styles from '../../css-modules/deletemodal.module.css'

function DeleteModal({setCurrentId, notebookId, item, setDelete, isDropdown}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id={styles.delete_modal} className={isDropdown ? `${styles.isDropdown}` : `${styles.notDropdown}`} onClick={() => setShowModal(true)}><BsTrash /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete setCurrentId={setCurrentId} notebookId={notebookId} setShowModal={setShowModal} setDelete={setDelete} item={item} />
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;