import { addPost, deletePost, editPost, filterPosts, getPosts } from './posts.js';
import { addComment, deleteComment, editComment } from './comments.js';

$(document).ready(() => {
    $('#post-form').on('submit', (event) => {
        event.preventDefault();
        const title = $('#post-title').val();
        const description = $('#post-description').val();
        addPost(title, description);
        renderPosts();
        $('#post-form')[0].reset();
    });

    $('#filter-keyword').on('input', () => {
        const keyword = $('#filter-keyword').val();
        renderPosts(keyword);
    });

    const renderPosts = (filterKeyword = '') => {
        const postsContainer = $('#posts-container');
        postsContainer.empty();
        const posts = filterKeyword ? filterPosts(filterKeyword) : getPosts();
        posts.forEach(post => {
            const postElement = $(`
                <div class="post" data-id="${post.id}">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <small>Publicado el: ${post.createdAt}</small>
                    <div class="post-actions">
                        <button class="edit-post">Editar</button>
                        <button class="delete-post">Eliminar</button>
                    </div>
                    <div class="comments-section">
                        <input type="text" class="comment-input" placeholder="Añadir un comentario">
                        <button class="add-comment">Comentar</button>
                        <div class="comments-container"></div>
                    </div>
                </div>
            `);
            
            postElement.find('.delete-post').on('click', () => {
                deletePost(post.id);
                renderPosts();
            });

            postElement.find('.edit-post').on('click', () => {
                const updatedTitle = prompt('Nuevo título:', post.title);
                const updatedDescription = prompt('Nueva descripción:', post.description);
                if (updatedTitle && updatedDescription) {
                    editPost(post.id, updatedTitle, updatedDescription);
                    renderPosts();
                }
            });

            const commentsContainer = postElement.find('.comments-container');
            post.comments.forEach(comment => {
                const commentElement = $(`
                    <div class="comment" data-id="${comment.id}">
                        <p>${comment.text} <small>(${comment.createdAt})</small></p>
                        <button class="edit-comment">Editar</button>
                        <button class="delete-comment">Eliminar</button>
                    </div>
                `);

                commentElement.find('.delete-comment').on('click', () => {
                    deleteComment(post.id, comment.id);
                    renderPosts();
                });

                commentElement.find('.edit-comment').on('click', () => {
                    const updatedText = prompt('Nuevo comentario:', comment.text);
                    if (updatedText) {
                        editComment(post.id, comment.id, updatedText);
                        renderPosts();
                    }
                });

                commentsContainer.append(commentElement);
            });

            postElement.find('.add-comment').on('click', () => {
                const commentText = postElement.find('.comment-input').val();
                if (commentText) {
                    addComment(post.id, commentText);
                    renderPosts();
                }
            });

            postsContainer.append(postElement);
        });
    };

    renderPosts();
});
