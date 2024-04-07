import './App.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost  from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import Post from './Post';
import PostLayout from './PostLayout';
import {Routes,Route, Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';

import {format} from 'date-fns';



function App() {

    const [posts,setPosts] = useState([
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "because they suspect that\nthey reject explanations and when\nthey reject discomforts and\nhow reprehensible options are, our circumstances are no longer even suitable for an architect",
          "datetime": "Monday, April 4 2024 08:00:00"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "who is it",
          "body": "these are the times of life\nfollow them without any guilt or regret\nthat pleasures avoid it all\nsoften the joys of rejecting those who seek or hate neither",
          "datetime": "Monday, April 4 2024 08:15:00"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "and the troubles are almost an exercise to repel the one who sits aut",
          "body": "and it's fair to say by what law\nall choices for\nthe joys of pain and accusation\nall his hatred and work and even the nature of the oil",
          "datetime": "Monday, April 4 2024 08:30:00"
        },
        {
          "userId": 1,
          "id": 4,
          "title": "he and the blamed",
          "body": "and often they reject the pleasure of receiving it\nhe assumed the guilt of providing the solution\nwho are here to provide solutions to avoid or regret\nwho are the pleasures of providing solutions or the truth",
          "datetime": "Monday, April 4 2024 08:45:00"
        }
      ]
      )
    const [search,setSearch] =useState('');
    const [searchResults, setSearchResults] = useState([]); 
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        const fileteredResults = posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) 
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(fileteredResults.reverse())
    },[posts,search])




    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length? posts[posts.length-1].id + 1:1;
        const datetime = format(new Date(),'MMM dd,yyy pp');
        const newPost = {id, title: postTitle,body:postBody,datetime}
        const allPosts = [...posts,newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
    }

    const handleDelete = (id) => {
      const postList = posts.filter(post =>post.id !== id)
      setPosts(postList)
      navigate('/')
    }

  return (
    <div className="App">
        {/* <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/NewPost">NewPost</Link></li>
                    <li><Link to="/PostPage">PostPage</Link></li>
                    
                    
                </ul>
            </nav>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/NewPost' element={<NewPost />} />
                <Route path='/About' element={<About />} />
                <Route path='/PostPage' element={<PostLayout />}>
                    <Route index element={<PostPa   ge />} />
                    <Route path=':id' element={<Post />} />
                    <Route path='NewPost' element={<NewPost />} />
                </Route>
                <Route path="/*" element={<Missing />}/>
            </Routes>   */}
        
   
        
      
       
        <Header 
            title ="BE Social " 
        />
        <Nav 
            search={search}
            setSearch={setSearch}
        />
        
        <Routes>        
          <Route  path='/' element={<Home posts ={searchResults}/>} />
          <Route path='Post'  >
            <Route index element={<NewPost
                    handleSubmit = {handleSubmit}
                    setPostBody={setPostBody}
                    postBody ={postBody}
                    setPostTitle = {setPostTitle}
                    postTitle = {postTitle}
            />}/>

            <Route path=':id' element={ <PostPage 
                                posts= {posts} 
                                handleDelete ={handleDelete}
            />}/>
          </Route>
         <Route path='About' element ={<About /> }/>

         <Route path='*' element={<Missing/>}/>
        </Routes>
        <Footer/> 


    </div>
  );
}

export default App;
