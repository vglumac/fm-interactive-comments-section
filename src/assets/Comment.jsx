import React from "react"
import { useState } from 'react'
import DeleteModal from "./DeleteModal"
import NewComment from "./NewComment"
import CommentCSS from "./comment.module.css"

export default function Comment(props) {
    function handleAddClick() {
        if (props.commentId) {
            return props.scoreChange(props.commentId, true, props.id)
        }
        props.scoreChange(props.id)
    }
    function handleMinusClick() {
        if (props.commentId) {
            return props.scoreChange(props.commentId, false, props.id)
        }
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
            if (props.commentId) {
                props.editComment(editedComment, props.commentId, props.id)
            }
            props.editComment(editedComment, props.id)
        }
    }

    return (
        <div>
            <div className={CommentCSS["comment-container"]}>
                <div className={`${CommentCSS.comment} ${currentUser ? CommentCSS.currentUser : ""}`}>
                    <div className={CommentCSS["comment__rating"]}>
                        <img className={CommentCSS["comment__rating-button"]} src='./public/icon-plus.svg' onClick={handleAddClick} />
                        <div className={CommentCSS["comment__rating-sum"]}>{props.score}</div>
                        <img className={CommentCSS["comment__rating-button"]} src='./public/icon-minus.svg' onClick={handleMinusClick} />
                    </div>

                    <div className={CommentCSS["comment__user"]}>
                        <img className={CommentCSS["comment__user-img"]} src={props.user.image.png} />
                        <a className={CommentCSS["comment__user-name"]} href="#">{props.user.username}</a>
                    </div>
                    <div className={CommentCSS["comment__time-stamp"]}>
                        {props.createdAt}
                    </div>
                    <div className={CommentCSS["comment__buttons"]}>
                        {!currentUser && <div className={CommentCSS["comment__button"]} onClick={handleReplyClick}>
                            <img src='./icon-reply.svg' alt="reply-icon" />
                            <span>Reply</span>
                        </div>}
                        {currentUser && <div className={`${CommentCSS["comment__button"]} ${CommentCSS["button--delete"]}`} onClick={handleDeleteClick}>
                            <img src='./icon-delete.svg' alt="delete-icon" />
                            <span>Delete</span>
                        </div>}
                        {currentUser && <div className={CommentCSS["comment__button"]} onClick={handleEditClick}>
                            <img src='./icon-edit.svg' alt="edit-icon" />
                            <span>Edit</span>
                        </div>}
                    </div>
                    {!isEditing && <div className={CommentCSS["comment__content"]}>
                        {props.content}
                    </div>}
                    {isEditing &&
                        <div className={CommentCSS["edit-comment"]}>
                            <textarea className={CommentCSS["edit-comment__input"]}
                                value={editedComment.content}
                                onChange={editComment}
                            ></textarea>
                            <button className={CommentCSS["edit-comment__button"]} onClick={confirmEdit}>Update</button>
                        </div>}
                </div>
            </div>
            {isReplying && <NewComment
                {...props.currentUser}
                saveNewComment={props.saveNewComment}
                replyingToId={props.commentId ? props.commentId : props.id}
                buttonLabel="REPLY"
                placeholderMessage={`@${props.user.username}`}
            />}
            {isDeleting && <DeleteModal
                closeModal={closeModal}
                confirmDelete={props.confirmDelete}
                commentId={props.commentId ? props.commentId : props.id}
                replyId={props.commentId ? props.id : null}
            />}
            <div className={CommentCSS['comment-replies-container']}>
                {props.children}
            </div>
        </div>
    )
}