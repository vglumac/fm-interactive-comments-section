import React from "react"
import { useState } from 'react'
import data from '../../data.json'
import Comment from './Comment.jsx'
import NewComment from './NewComment.jsx'
import CommentsCSS from './comments.module.css'

export default function Comments() {
    const [commentData, setCommentData] = useState(() => JSON.parse(localStorage.getItem('comments')) || data.comments);
    const [currentUser, setCurrentUser] = useState(data.currentUser);
    const [lastId, setLastId] = useState(5)
    const [activeComment, setActiveComment] = useState(null)
    const [activeModal, setActiveModal] = useState(null)
    
    React.useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(commentData))
    }, [commentData])

    function sortComments() {
        setCommentData(prevData => prevData.sort((a, b) => b.score - a.score))
    };
    
    function scoreChange(id, add = true, replyId) {
        setCommentData(prevCommentData => {
            const newCommentData = prevCommentData.map(com => {
                if (id === com.id) {
                    if (replyId) {
                        return {
                            ...com,
                            replies: com.replies.map(rep => {
                                if (rep.id === replyId) {
                                    return {
                                        ...rep,
                                        score: add ? rep.score + 1 : rep.score - 1
                                    }
                                }
                                return rep;
                            })
                        }
                    }
                    return {
                        ...com,
                        score: add ? com.score + 1 : com.score - 1
                    }
                }
                return com;
            });
            return newCommentData;
        })
        sortComments();
    }

    function saveNewComment(newCommentData, replyingToId = null) {
        setLastId(prev => prev + 1)
        if (!replyingToId) {
            setCommentData(prevCommentData => {
                return [
                    ...prevCommentData,
                    { ...newCommentData, id: lastId }
                ];
            })
            return
        }
        setCommentData(prevCommentData => {
            return prevCommentData.map(comment => {
                if (comment.id === replyingToId) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                ...newCommentData, 
                                id: lastId
                            }
                ]
                    }
                }
                return comment
            })
        })
        setActiveComment(null);
    }

    function editComment(editedComment, id, replyId = null) {
        setCommentData(prevCommentData => {
            return prevCommentData.map(com => {
                if (id === com.id) {
                    if (replyId) {
                        return {
                            ...com,
                            replies: com.replies.map(reply => {
                                if (reply.id === replyId) {
                                    return {
                                        ...reply,
                                        content: editedComment.content
                                    }
                                }
                                return reply;
                            })
                        }
                    }
                    return {
                        ...com,
                        content: editedComment.content
                    }
                }
                return com;
            })
        })
        setActiveComment(null)
    }


    function deleteComment(commentId, replyId) {
        if (!replyId) {
            setCommentData(prevCommentData => {
                return prevCommentData.filter(comment => comment.id !== commentId)
            })
            return
        }
        setCommentData(prevCommentData => {
            return prevCommentData.map(com => {
                if (com.id === commentId) {
                    return {
                        ...com,
                        replies: com.replies.filter(reply => reply.id !== replyId)
                    }
                }
                return com;
            })
        })
        setActiveModal(null)
    }

    return (
        <div className={CommentsCSS["comment-section"]}>
            {commentData.map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        {...comment}
                        scoreChange={scoreChange}
                        currentUser={currentUser}
                        editComment={editComment}
                        confirmDelete={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        saveNewComment={saveNewComment}
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                    />
                );
            })}
            <NewComment
                {...currentUser}
                saveNewComment={saveNewComment}
                replyingToId = {null}
                buttonLabel="SEND"
                placeholderMessage="Add a comment..."
            />

        </div>
    )
}

