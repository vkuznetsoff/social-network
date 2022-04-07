import React from "react";
import { connect } from "react-redux";
import {
  addPostActionCreator,
  updatePostActionCreator,
} from "../../../redux/profile_reducer.ts";
import MyPosts from "./MyPosts";

// const MyPostsContainer = () => {
//    return (
//     <StoreContext.Consumer>
//       { (store) => {
//         let state = store.getState();

//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };

//         let onPostChange = (text) => {
//           let action = updatePostActionCreator(text);
//           store.dispatch(action);
//         };

//         return (
//         <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             posts={state.profilePage.posts}
//             newPostText={state.profilePage.newPostText}
//           />
//         )
//       }      }
      
//     </StoreContext.Consumer>
//   );
// };

const mapStateToProps = (state) => {
  return {
    
            posts: state.profilePage.posts, 
            newPostText: state.profilePage.newPostText

  }
}

const mapDispatchToProps = (dispath) => {
  return {
    // updateNewPostText: (text) => {
    //   dispath(updatePostActionCreator(text))
    // },

    addPost: (newposttext) => {
      dispath(addPostActionCreator(newposttext))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)

export default MyPostsContainer;
