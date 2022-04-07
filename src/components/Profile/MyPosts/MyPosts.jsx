import React from "react";
import { addPostActionCreator, updatePostActionCreator } 
from "../../../redux/profile_reducer.ts";
import s from "./MyPosts.module.css";
import Posts from "./Post/Post";
import { Field, reduxForm } from 'redux-form'
import { maxLength15, maxLength30, maxLength5, requiredField } from "../../../utils/validators/validators";
import { Textarea } from "../../../utils/validators/formscontrol";

{/* <form >
    <div>
        <textarea
          ref={newPostEl}
          value={props.newPostText}
          onChange={onPostChange}
        ></textarea>
      </div>

      <div>
        <button className={s.addButton} onClick={onAddPost}>
          Add Post
        </button>
      </div>
  </form> */}


const  MyPosts = (props)  => {
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps!=this.props || nextState!=this.state
  // }

  
    console.log('Render myPosts')
    
  
    let postElement = props.posts.map((p) => (
      <Posts text={p.text} likeCount={p.likeCount} />
    ));
      
  
  const addNewPost = (values) => {
    props.addPost(values.newposttext);
  }


    return (
      <div>
        <div className={s.posts}>
          <h3>MyPosts</h3>
        </div>
        <div className={s.newpost}>NewPosts</div>
  
        <PostReduxForm onSubmit={addNewPost} />
  
        <div className={s.posts}>{postElement}</div>
      </div>
    );
  
};

const PostForm = (props) => {
  
  return (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder=" your post..."
      name="newposttext"
      component={Textarea}
      validate={[requiredField, maxLength30]} />
        {/* <textarea
          ref={newPostEl}
          value={props.newPostText}
          onChange={onPostChange}
        ></textarea> */}
      </div>

      <div>
        
        <button> {/*className={s.addButton} onClick={onAddPost}>*/}
          Add Post
        </button>
      </div>
  </form>
  )
}

const PostReduxForm = reduxForm({form: 'addnewpost'})(PostForm)


export default React.memo(MyPosts);
