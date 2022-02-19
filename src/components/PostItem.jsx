import React from 'react'
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {

    // console.log ('props =', props)
    // console.log ('props.post =', props.post)
    // console.log ('props.post.title =', props.post.title)
    
    return(
        <div>
            <div className='post'>
                <div className='post__content'>
                  
                   <strong> {props.number} . {props.post.title}</strong>
                    <div>
                        {props.post.title} : {props.post.body}
                    </div>
                </div>

                <div className='post__btns'>
                    {/* <button style= {{border:'2px solid blue', padding: '7px', borderRadius: '10px' }}> Удалить </button> */}
                    <MyButton onClick={()=>props.remove(props.post)} >Удалить</MyButton>
                  
                </div>  
            </div>
        </div>
    )
}
export default PostItem;