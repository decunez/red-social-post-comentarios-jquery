
import { posts } from './posts.js';

export const addComment = (postId, text) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
        const newComment = {
            id: Date.now(),
            text,
            createdAt: new Date().toLocaleString(),
        };
        post.comments.push(newComment);
        return newComment;
    }
    return null;
};

export const deleteComment = (postId, commentId) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
        const index = post.comments.findIndex(comment => comment.id === commentId);
        if (index !== -1) {
            post.comments.splice(index, 1);
        }
    }
};

export const editComment = (postId, commentId, updatedText) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
        const comment = post.comments.find(comment => comment.id === commentId);
        if (comment) {
            comment.text = updatedText;
        }
    }
};
