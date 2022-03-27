import dialogReducer from "./dialogs_reducer";
import profileReducer from "./profile_reducer";
import sidebarReducer from "./sidebar_reducer";


let store = {
  _state: {
    DialogPage: {
      dialogs: [
        { id: 1, name: "Semen" },
        { id: 2, name: "Ivan" },
        { id: 3, name: "Andrey" },
      ],

      messages: [
        { id: 1, text: 'Hi, how are you?' },
        { id: 2, text: 'Whats up?' },
        { id: 3, text: 'New message.' },
        { id: 4, text: 'Something new' },
      ],

      newMessageText: "Default-text",
    },

    ProfilePage: {
      posts: [
        { id: 1, text: "Good day to live", likeCount: 2 },
        { id: 2, text: "Something else", likeCount: 12 },
        { id: 3, text: "Skoobi-doo", likeCount: 10 },
      ],

      newPostText: "some text",
    },
  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log("123");
  },

  addPost() {
    let newPost = {
      id: 5,
      text: this._state.ProfilePage.newPostText,
      likeCount: 0,
    };
    this._state.ProfilePage.posts.push(newPost);
    this._state.ProfilePage.newPostText = "";
    this._callSubscriber();
  },

  updateNewPostText(newtext) {
    this._state.ProfilePage.newPostText = newtext;
    this._callSubscriber();
  },

  updateNewMessageText(newtext) {
    this._state.DialogPage.newMessageText = newtext;
    this._callSubscriber();
  },

  sendNewMessage() {
    let newMesage = {
      id: 5,
      text: this._state.DialogPage.newMessageText,
    };
    this._state.DialogPage.messages.push(newMesage);
    this._state.DialogPage.newMessageText = "";
    this._callSubscriber();
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispath(action) {

    this._state.ProfilePage = profileReducer(this._state.ProfilePage, action);
    this._state.DialogPage = dialogReducer(this._state.DialogPage, action);
    this._state = sidebarReducer(this._state, action);

    this._callSubscriber();

    
  },
};


export default store;
window.store = store;
