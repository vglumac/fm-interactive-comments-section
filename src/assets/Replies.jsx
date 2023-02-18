import React from 'react'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import NewComment from './NewComment'
// import "./replies.css"

export default function Reply(props) {
    function handleAddClick() {
        props.scoreChange(props.commentId, true, props.id)
    }
    function handleMinusClick() {
        props.scoreChange(props.commentId, false, props.id)
    }

    const currentUser = props.currentUser.username === props.user.username;

    // Reply 

    const isReplying = props.activeComment && props.activeComment.type === 'replying' && props.activeComment.id === props.id;
    function handleReplyClick() {
        props.setActiveComment({id: props.id, type: 'replying'})
    }

    // Delete

    const isDeleting = props.activeModal && props.activeModal.type === 'delete' && props.activeModal.id === props.id

    
    function handleDeleteClick() {
        props.setActiveModal({ id: props.id, type: 'delete' })
    }

    function closeModal() {
        props.setActiveModal(null)
    }

    // Edit

    const isEditing = props.activeComment && props.activeComment.type === 'editing' && props.activeComment.id === props.id;
    const [editedComment, setEditedComment] = useState({ content: props.content })

    function handleEditClick() {
        props.setActiveComment({id: props.id, type: 'editing'})
    }

    function editComment(event) {
        setEditedComment({ content: event.target.value })
    }

    function confirmEdit() {
        if (editedComment.content) {
            props.editComment(editedComment, props.commentId, props.id)
        }
    }

    return (
        <div className="comment-container">
            <div className={`comment comment--reply ${currentUser ? " current-user" : ""}`}>
                <div className="comment__rating">
                    <img className="comment__rating-button" src='./icon-plus.svg' onClick={handleAddClick} />
                    <div className="comment__rating-sum">{props.score}</div>
                    <img className="comment__rating-button" src='./icon-minus.svg' onClick={handleMinusClick} />
                </div>

                <div className="comment__user">
                    <img className="comment__user-img" src={props.user.image.png} />
                    <a className="comment__user-name" href="#">{props.user.username}</a>
                </div>
                <div className="comment__time-stamp">
                    {props.createdAt}
                </div>
                <div className="comment__buttons">
                    {!currentUser && <div className="comment__button button--reply" onClick={handleReplyClick}>
                        <img src='./icon-reply.svg' alt="reply-icon" />
                        <span>Reply</span>
                    </div>}
                    {currentUser && <div className="comment__button button--delete" onClick={handleDeleteClick}>
                        <img src='./icon-delete.svg' alt="delete-icon" />
                        <span>Delete</span>
                    </div>}
                    {currentUser && <div className="comment__button button--edit" onClick={handleEditClick}>
                        <img src='./icon-edit.svg' alt="edit-icon" />
                        <span>Edit</span>
                    </div>}
                </div>
                {!isEditing && <div className="comment__content">
                    {props.content}
                </div>}
                {isEditing &&
                    <div className="edit-comment">
                        <textarea className="edit-comment__input"
                            value={editedComment.content}
                            onChange={editComment}
                        ></textarea>
                        <button className="edit-comment__button" onClick={confirmEdit}>Update</button>
                    </div>}
            </div>
            {isReplying && <NewComment
                {...props.currentUser}
                saveNewComment={props.saveNewComment}
                replyingToId={props.commentId}
                buttonLabel="REPLY"
                placeholderMessage={`@${props.user.username}`}
            />}
            {isDeleting && <DeleteModal
                closeModal={closeModal}
                confirmDelete={props.confirmDelete}
                commentId={props.commentId}
                replyId={props.id}
            />}
        </div>
    )
}