import React from 'react'
import {useState} from 'react'
// import './newcomment.css'

export default function NewComment(props) {
    const [newComment, setNewComment] = useState({
        content: "",
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
        <div className={`comment new-comment ${props.replyingToId ? "comment--reply" : ""}`}>
            <div className="new-comment__user">
                <img className="comment__user-img" src={newComment.user.image.png} />
            </div>
            <div className="new-comment__content">
                <textarea 
                    className="new-comment__input" 
                    name="new-comment-text" 
                    type="text-area"
                    placeholder={props.placeholderMessage}
                    value={newComment.content}
                    onChange={handleChange}
                >                   
                </textarea>
            </div>
            <button className="new-comment__button" onClick={handleClick}>{props.buttonLabel}</button>
        </div>
    )
}