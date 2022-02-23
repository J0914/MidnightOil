
import {useEffect} from 'react';
import styles from '../../css-modules/deletemodal.module.css';

const ConfirmDelete = ({setCurrentId, notebookId, setShowModal, setDelete, item}) => {
   
    useEffect(() => {
        if (item === 'notebook') {
            setCurrentId(notebookId)
        }
      }, [])
   
    return (
        <div id={styles.delete_wrapper}>
            <h1 id={styles.delete_header}>Confirm Delete</h1>
            <p id={styles.sure}>Are you sure you want to delete this {item}?</p>
            <div id={styles.button_wrapper}>
                <button className={styles.del_or_cancel} onClick={() => {
                    setDelete(true)
                    setShowModal(false)
                }}>Delete</button>
                <button className={styles.del_or_cancel} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmDelete;