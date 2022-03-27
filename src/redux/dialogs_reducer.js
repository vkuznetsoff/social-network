// const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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

  
};


const dialogReducer = (state = initialState, action) => {
 
   switch (action.type) {
    // case UPDATE_MESSAGE_TEXT:
    //   return {
    //     ...state,
    //     newMessageText: action.newtext
    //   };

      
      
    case SEND_MESSAGE: 
    let text = action.newmessage;
    return {
      ...state,
      messages: [...state.messages, {id: 5, text: text }]
    }
      
    default:
      return state;

  }
};

export const sendMessageActionCreator = (newmessage) => ({ type: SEND_MESSAGE, newmessage } );

// export const updateMessageActionCreator = (txt) => ({
//   type: UPDATE_MESSAGE_TEXT,
//   newtext: txt,
// });


export default dialogReducer;
