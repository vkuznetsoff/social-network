import profileReducer, { addPostActionCreator, postDeleteAC } from "./profile_reducer";

let state = {
  posts: [
    { id: 1, text: "Good day to live", likeCount: 2 },
    { id: 2, text: "Something else", likeCount: 12 },
    { id: 3, text: "Skoobi-doo", likeCount: 10 },
  ],
};


test('Length of posts should be incremented', () => {
  let action = addPostActionCreator('newtext1');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
  expect(newState.posts[3].text).toBe('newtext1')
});


test('Length of posts decremete after Delete post', () => {
  let action = postDeleteAC(3);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
  
});


