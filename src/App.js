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
import { DataProvider } from './context/DataContext';


function App() {


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
        <DataProvider>
          <Header 
              title ="BE Social"             
          />
          <Nav />
          
          <Routes>        
            <Route  path='/' element={<Home  />}
            />
            <Route path='Post'  >
              <Route index element={<NewPost />}/>
          
              <Route path=':id' element={ <PostPage  />}/>
            </Route>
            <Route path='/edit/:id' element={<EditPost />} />
            <Route path='About' element ={<About /> }/>
            <Route path='*' element={<Missing/>}/>
          </Routes>
          <Footer/> 
        </DataProvider>
    </div>
  );
}

export default App;
