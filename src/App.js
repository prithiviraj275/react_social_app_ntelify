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
import EditPost from './EditPost';
import {Routes,Route, Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import api from './api/postss';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {

    const [posts,setPosts] = useState([])
    const [search,setSearch] =useState('');
    const [searchResults, setSearchResults] = useState([]); 
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const {width} = useWindowSize()
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');


    useEffect(()=>{
      setPosts(data)
    },[data])

    // useEffect(()=>{
    //   const fetchPosts = async()=>{
    //     try {
    //       const response = await api.get('/posts');
    //       setPosts(response.data);
    //     } catch (error) {
    //       if(error.response){
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //       }else{
    //         console.log(`Error: ${error.message}`);
    //       }
    //     }
    //   }
    //   fetchPosts();
    // },[])




    useEffect(()=>{
        const fileteredResults = posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) 
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(fileteredResults.reverse())
    },[posts,search])




    const handleSubmit = async(e) => {
        e.preventDefault();
        const id = posts.length? posts[posts.length-1].id + 1:1;
        const datetime = format(new Date(),'MMM dd,yyy pp');
        const newPost = {id, title: postTitle,body:postBody,datetime}
        try{
          const response = await api.post('/posts',newPost)
          const allPosts = [...posts,newPost];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
        }catch(error){
          if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }else{
            console.log(`Error: ${error.message}`);
          }
        }
    }

    const handleEdit = async (id) => {
      
        const datetime = format(new Date(),'MMM dd,yyy pp');
        const updatedPost =  {id, title: editTitle, datetime, body:editBody}
        
      try { 
        const response = await api.put(`/posts/${id}`,updatedPost);
        setPosts(posts.map(post => post.id === id? {...response.data}:post));
        setEditTitle('');
        setEditBody('');
        navigate('/');



      } catch (error) {
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }else{
          console.log(`Error: ${error.message}`);
        }
      }
    }

    const handleDelete =async (id) => {
      try {
        await  api.delete(`/posts/${id}`)
        const postList = posts.filter(post =>post.id !== id)
        setPosts(postList)
        navigate('/')
      } catch (error) {
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }else{
          console.log(`Error: ${error.message}`);
        }
      }
   
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
            title ="BE Social"
            width= {width} 
        />
        <Nav 
            search={search}
            setSearch={setSearch}
        />
        
        <Routes>        
          <Route  path='/' element={<Home 
                                    posts ={searchResults}
                                    fetchError = {fetchError}
                                    isLoading = {isLoading}
                                    
                                    />}
           />
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
          <Route path='/edit/:id' element={<EditPost 
            posts = {posts}
            handleEdit ={handleEdit}
            editBody = {editBody}
            editTitle = {editTitle}
            setEditBody={setEditBody}
            setEditTitle ={setEditTitle}
          />} />

          <Route path='About' element ={<About /> }/>
          <Route path='*' element={<Missing/>}/>

        </Routes>
        <Footer/> 


    </div>
  );
}

export default App;
