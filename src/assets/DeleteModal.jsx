import React from 'react'
import DeleteModalCSS from "./delete_modal.module.css"

export default function DeleteModal(props) {

    function handleConfirmDelete() {
        props.closeModal();
        props.confirmDelete(props.commentId, props.replyId)
    }
    return (
        <div className={DeleteModalCSS["modal-container"]}>
            <div className={DeleteModalCSS["modal-delete"]}>
                <h3 className={DeleteModalCSS["modal-delete__title"]}>Delete comment</h3>
                <p className={DeleteModalCSS["modal-delete__message"]}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={DeleteModalCSS["modal-delete__buttons"]}>
                    <button className={DeleteModalCSS["modal-delete__button"]} onClick={props.closeModal}>No, cancel</button>
                    <button className={`${DeleteModalCSS["modal-delete__button"]} ${DeleteModalCSS["modal-delete__button--red"]}`} onClick={handleConfirmDelete}>Yes, delete</button>
                </div>
            </div>
        </div>
    )
}