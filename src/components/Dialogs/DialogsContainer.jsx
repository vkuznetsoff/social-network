import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  sendMessageActionCreator,
  updateMessageActionCreator,
} from "../../redux/dialogs_reducer";

import Dialogs from "./Dialogs";

// const DialogsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         // let state = store.getState();

//         let sendMessage = () => {
//           store.dispatch(sendMessageActionCreator());
//         };

//         let updateNewMessageText = (text) => {
//           // props.store.dispatch(updateMessageActionCreator(text))
//           let action = updateMessageActionCreator(text);
//           store.dispatch(action);
//         };

//         return (
//           <Dialogs
//             sendMessage={sendMessage}
//             updateNewMessageText={updateNewMessageText}
//             dialogPage={store.getState().dialogPage}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => {

  return {
    dialogPage: state.dialogPage
    
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newmessage) => {
      dispatch(sendMessageActionCreator(newmessage));
    }

    // updateNewMessageText: (text) => {
    //   dispatch(updateMessageActionCreator(text))
    // }

  };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent); //Dialogs-компоненту законнектили к Store

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)
(Dialogs);
