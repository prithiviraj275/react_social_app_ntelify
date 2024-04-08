import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext)
  const { id } = useParams();

  // Check if posts array is not empty
  if (!posts || posts.length === 0) {
    return (
      <main className='PostPage'>
        <article className='post'>
          <h2>No Posts Found</h2>
          <p>There are no posts available.</p>
        </article>
      </main>
    );
  }

  // Find the post with the matching id
  const post = posts.find(post => post.id === id);  

  // Check if post is found
  if (!post) {
    return (
      <main className='PostPage'>
        <article className='post'>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing..</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </article>
      </main>
    );
  }

  // Render post if found
  return (
    <main className='PostPage'>
      <article className='post'>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
        <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
        <Link to ={`/edit/${post.id}`}>
          <button className='editButton'>Edit Post</button>
        </Link>
      </article>
    </main>
  );
}

export default PostPage;
