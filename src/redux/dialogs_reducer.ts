
const SEND_MESSAGE = "SEND-MESSAGE";

export type UserDialogsType = {
  id: number,
  name: string
}

export type UserMessagesType = {
  id: number,
  text: string | null
}

// export type InitialStateType = {
//   dialogs: Array<UserDialogsType>,
//   messages: Array<UserMessagesType>
// }

let initialState = {
  dialogs: [
    { id: 1, name: "Semen" },
    { id: 2, name: "Ivan" },
    { id: 3, name: "Andrey" },
  ] as Array<UserDialogsType>,

  messages: [
    { id: 1, text: 'Hi, how are you?' },
    { id: 2, text: 'Whats up?' },
    { id: 3, text: 'New message.' },
    { id: 4, text: 'Something new' },
  ] as Array<UserMessagesType>,

};

export type InitialStateType = typeof initialState


const dialogReducer = (state = initialState, action: any) : InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let text = action.newmessage;
      return {
        ...state,
        messages: [...state.messages, { id: 5, text: text }]
      }

    default:
      return state;

  }
};

type SendMessageActionCreatorType = {
  type: typeof SEND_MESSAGE,
  newmessage: string | null
}
export const sendMessageActionCreator = (newmessage: string | null) : SendMessageActionCreatorType  => (
  { type: SEND_MESSAGE, newmessage }
  );

export default dialogReducer;
