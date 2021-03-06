import React, { useRef, useState, useMemo, useEffect } from 'react'
import './components/styles/App.css'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal.jsx'

import s from './App.module.css'

import { v4 as uuidv4 } from 'uuid';
import MyButton from './components/UI/button/MyButton';
import './App.css';
import {usePosts} from './hooks/usePosts'

import MyDiogram from './components/MyDiogram';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import starImg from './img/star.png'
import {getPageCount, getPagesArray} from './utils/pages.js'



function App() {
  
    const [posts, setPosts] = useState ( [
        {id: 1, title: "JavaScript", body: "It's one of the most popular programming languages ​​now!" },
        {id: 2, title: "TypeScript", body: "I don't know any about this programming language." },
        {id: 3, title: "Pyton", body: "Description" },
        {id: 4, title: "Java", body: "OOP programming language." },
        {id: 5, title: "PHP", body: "It's language for Web." }
      ]
    )

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState (false);
    const [totalPages, setTotalPages] = useState (0);
    const [limit, setLimit] = useState (10);
    const [page, setPage] = useState (1);
    const sortedAndSearchedPosts = usePosts (posts, filter.sort, filter.query)

    let pagesArray = getPagesArray(totalPages)
   
    console.log ("pagesArray = ", pagesArray )
    
    const [fetchPosts, isPostsLoading, postError] = useFetching ( async ()=>{
        const response = await PostService.getAll(limit, page)
        setPosts (response.data)
        // console.log (" response.headers['x-total-count'] = ", response.headers['x-total-count'])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
        })

        console.log (" totalPages =  ", totalPages)
  
    useEffect ( ()=> {
      console.log ("USE EFFECT")
      fetchPosts ()
    }, [])

 const createPost = (newPost) =>{
   setPosts ( [...posts, newPost])
   setModal(false)
 }



 const removePost = (post)=> {
   setPosts(posts.filter(p=>p.id !== post.id) )
 }
  
  
  const  MyFunctionTest =   (value) => {
    console.log ('MyFunctionTest (value) :   value = ', value)
  }

  
  

  return (
    <div className="App">
      
      <title>My-app</title>
      
      <button onClick={fetchPosts}>GET POSTS</button>
     
      <MyButton style = {{marginTop: "50px"}}onClick={ ()=> setModal (true) } >
        Создать пользователя
      </MyButton>

      <MyModal visible= {modal} setVisible={setModal}>
        <PostForm create= {createPost}/>
      </MyModal>

    <hr style = {{margin: '15px 0', color: 'blue', background: 'blue', height: '5px'}}/>

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
    {/* В теге img не пишем прямой путь к картинке, а импортируем ее как модуль */}
    
    <div style={{ display: 'flex', justifyContent: 'end'}}>
      <img src={starImg} alt=" It's a star! :)" className='starImg' />
</div>
      {postError && 
          <h1>Произошла ошибка ${postError}</h1>
        }

      {/* <span className={s.testStyle}> <b>TEST TEXT</b> </span> */}

      {isPostsLoading
        // ? <h1>Идёт загрузка ...</h1>
        ?<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList posts = {sortedAndSearchedPosts} remove={removePost} title = {"Список постов 1"} MyFunctionTest = {MyFunctionTest} />
      }

      <div className='page__wrapper'>

        {/* Массив с кнопками пагинации */}
      {/* {pagesArray.map(p=>
        <MyButton className="page">{p}</MyButton>
        )} */}

        {pagesArray.map(p=>
          <span 
            key = {p}
            className={page===p ? 'page page__current' : 'page' }
            onClick = {()=>setPage(p)}
          >
            {p}
          </span>
        )}

      </div>

      
   


<p>Диаграмма: </p>
      <MyDiogram/>

    </div>
  );
}

export default App;


