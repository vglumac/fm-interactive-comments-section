import React from "react"
import { useState } from 'react'
import Replies from "./Replies.jsx"
import DeleteModal from "./DeleteModal"
import NewComment from "./NewComment"
// import "./comment.css"
// import "./edit_comment.css"

export default function Comment(props) {
    function handleAddClick() {
        props.scoreChange(props.id)
    }
    function handleMinusClick() {
        props.scoreChange(props.id, false)
    }

    const currentUser = props.currentUser.username === props.user.username;

    /* Reply */

    const isReplying = props.activeComment && props.activeComment.type === 'replying' && props.activeComment.id === props.id;
    function handleReplyClick() {
        props.setActiveComment({ id: props.id, type: 'replying' })
    }

    /* Delete */

    const isDeleting = props.activeModal && props.activeModal.type === 'delete' && props.activeModal.id === props.id

    
    function handleDeleteClick() {
        props.setActiveModal({ id: props.id, type: 'delete' })
    }

    function closeModal() {
        props.setActiveModal(null)
    }

    /* Edit */

    const isEditing = props.activeComment && props.activeComment.type === 'editing' && props.activeComment.id === props.id;
    const [editedComment, setEditedComment] = useState({ content: props.content })

    function handleEditClick() {
        props.setActiveComment({ id: props.id, type: 'editing' })
    }

    function editComment(event) {
        setEditedComment({ content: event.target.value })
    }

    function confirmEdit() {
        if (editedComment.content) {
            props.editComment(editedComment, props.id)
        }
    }

    return (
        <div>
            <div className="comment-container">
                <div className={`comment ${currentUser ? "current-user" : ""}`}>
                    <div className="comment__rating">
                        <img className="comment__rating-button" src='./public/icon-plus.svg' onClick={handleAddClick} />
                        <div className="comment__rating-sum">{props.score}</div>
                        <img className="comment__rating-button" src='./public/icon-minus.svg' onClick={handleMinusClick} />
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
            </div>
            {isReplying && <NewComment
                {...props.currentUser}
                saveNewComment={props.saveNewComment}
                replyingToId={props.id}
                buttonLabel="REPLY"
                placeholderMessage={`@${props.user.username}`}
            />}
            {isDeleting && <DeleteModal
                closeModal={closeModal}
                confirmDelete={props.confirmDelete}
                commentId={props.id}
                replyId={null}
            />}
            {props.replies && props.replies.map(reply => {
                return (
                    <Replies
                        key={reply.id}
                        {...reply}
                        scoreChange={props.scoreChange}
                        commentId={props.id}
                        currentUser={props.currentUser}
                        editComment={props.editComment}
                        confirmDelete={props.confirmDelete}
                        activeComment={props.activeComment}
                        setActiveComment={props.setActiveComment}
                        saveNewComment={props.saveNewComment}
                        activeModal={props.activeModal}
                        setActiveModal={props.setActiveModal}
                    />
                );
            })}
        </div>
    )
}