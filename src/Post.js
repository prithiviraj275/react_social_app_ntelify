import React from 'react'
import {useParams,Link} from 'react-router-dom'

const Post = ({post}) => {
    // const {id} = useParams() // this can be used we pass the parameter in link
  return (
    <article className='post'>
      <Link to ={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <h3>{post.datetime}</h3>
      </Link>
        <p className='postBody'>

          {(post.body).length <= 25? 
          post.body : `${(post.body).slice(0,25)}...`}

        </p>
    </article>
  )
}

export default Post