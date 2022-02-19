import React from 'react'
import PostItem from './PostItem'
import { v4 as uuidv4 } from 'uuid';
import {TransitionGroup, CSSTransition } from 'react-transition-group'

function PostList ({posts, remove, title, MyFunctionTest}) {
 
 ////////////
  // function PostList ({posts,  title, MyFunctionTest}) {
  let value = 777
  // console.log ('MyFunctionTest : ',MyFunctionTest)
///////////

  if (!posts.length) {
    return (
        <h1 style = {{ textAlign: 'center', color: 'blue'}}>
          Посты не найдены!
        </h1>
      )
  }


  MyFunctionTest(value)

    return(
        <div>
            <h1 style= {{ textAlign: 'center', color: 'blue'}}> {title} </h1>
            <TransitionGroup >
                {posts.map ( (post, index) => 
                      <CSSTransition
                        // key= {uuidv4()} 
                        key = {post.id}
                        timeout={500}
                        classNames="post"
                      >
                           <PostItem remove={remove} number={index+1} post={post} />
                          
                      </CSSTransition> 
                    )
                }
             </TransitionGroup>
        </div>
    )
}

export default PostList;