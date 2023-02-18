import React from 'react'
import "./delete_modal.css"

export default function DeleteModal(props) {

    function handleConfirmDelete() {
        props.closeModal();
        props.confirmDelete(props.commentId, props.replyId)
    }
    return (
        <div className="modal-container">
            <div className="modal-delete">
                <h3 className="modal-delete__title">Delete comment</h3>
                <p className="modal-delete__message">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-delete__buttons">
                    <button className="modal-delete__button" onClick={props.closeModal}>No, cancel</button>
                    <button className="modal-delete__button modal-delete__button--red" onClick={handleConfirmDelete}>Yes, delete</button>
                </div>
            </div>
        </div>
    )
}