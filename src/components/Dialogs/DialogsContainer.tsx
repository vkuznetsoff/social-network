import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { SendMessageActionCreatorType } from "../../redux/dialogs_reducer";
import {
  sendMessageActionCreator,
  updateMessageActionCreator,
  UserDialogsType
} from "../../redux/dialogs_reducer.ts";
import { AppStateType } from "../../redux/redux_store";

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

type MapStatePropsType = {
  dialogPage: UserDialogsType
};

type MapDispatchPropsType = {
  sendMessage: (newmessage: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogPage: state.dialogPage,
  };
};

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType  => {
  return {
    sendMessage: (newmessage: string) => {
    dispatch(sendMessageActionCreator(newmessage));
    },
  };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent); //Dialogs-компоненту законнектили к Store

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null,  AppStateType>
  (mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
