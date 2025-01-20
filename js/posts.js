export const posts = []; 

export const addPost = (title, description) => {
    const newPost = {
        id: Date.now(),
        title,
        description,
        comments: [],
        createdAt: new Date().toLocaleString(),
    };
    posts.push(newPost);
    return newPost;
};

export const deletePost = (postId) => {
    const index = posts.findIndex(post => post.id === postId);
    if (index !== -1) {
        posts.splice(index, 1);
    }
};

export const editPost = (postId, updatedTitle, updatedDescription) => {
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.title = updatedTitle;
        post.description = updatedDescription;
    }
};

export const filterPosts = (keyword) => {
    return posts.filter(post => post.title.toLowerCase().includes(keyword.toLowerCase()));
};

export const getPosts = () => posts;
