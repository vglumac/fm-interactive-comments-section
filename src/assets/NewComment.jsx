import React from 'react'
import {useState} from 'react'
import NewCommentCSS from './newcomment.module.css'

export default function NewComment(props) {
    const [newComment, setNewComment] = useState({
        content: props.replyingToId ? props.placeholderMessage : "",
        createdAt: "1 second ago",
        score: 0,
        user: {
            image: { 
                png: props.image.png,
                webp: props.image.webp
            },
            username: props.username
        },
        replies: []
    });

    function handleChange(event) {
        setNewComment(prevNewComment => {
            return {
                ...prevNewComment,
                content: event.target.value
            }
        })
    }

    function handleClick() {
        if (newComment.content) {
            props.saveNewComment(newComment, props.replyingToId)
            setNewComment(prevNewComment => {
                return {
                    ...prevNewComment,
                    content: ""
                }
            })
        }  
    }

    return (
        <div className={`${NewCommentCSS["new-comment"]} ${props.replyingToId ? NewCommentCSS["comment--reply"] : ""}`}>
            <div className={NewCommentCSS["new-comment__user"]}>
                <img className={NewCommentCSS["comment__user-img"]} src={newComment.user.image.png} />
            </div>
            <div className={NewCommentCSS["new-comment__content"]}>
                <textarea 
                    className={NewCommentCSS["new-comment__input"]} 
                    name="new-comment-text" 
                    type="text-area"
                    placeholder={props.replyingToId ? "" : props.placeholderMessage}
                    value={newComment.content}
                    onChange={handleChange}
                >                   
                </textarea>
            </div>
            <button className={NewCommentCSS["new-comment__button"]} onClick={handleClick}>{props.buttonLabel}</button>
        </div>
    )
}