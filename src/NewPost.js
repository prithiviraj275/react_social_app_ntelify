import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const {handleSubmit,setPostBody,postBody,setPostTitle,postTitle} = useContext(DataContext)
  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form action="" className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTilte"> Tilte:</label>
        <input 
            type="text"
            id='postTitle'
            required
            value={postTitle}
            onChange={(e)=> setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
            id="postBody"
            required
            value={postBody}
            onChange={(e)=> setPostBody(e.target.value)} 
        />
        <button type='submit'>Submit</button>
        </form>
    </main>

  )
}

export default NewPost