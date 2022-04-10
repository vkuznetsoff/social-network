import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
// import {
//   sendMessageActionCreator,
//   updateMessageActionCreator,
// } from "../../redux/dialogs_reducer";
import { Textarea } from "../../utils/validators/formscontrol";
import { maxLength30, requiredField } from "../../utils/validators/validators";
import s from "./Dialogs.module.css";
import DialogItem from "./DilogItem/DialogItem.tsx";
import MessageItem from "./MessageItem/MessageItem.tsx";

const Dialogs = ({dialogPage, sendMessage}) => {
  
  let dialogs = dialogPage.dialogs.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));
  let messages = dialogPage.messages.map((m) => (
    <MessageItem text={m.text} />
  ));

  const addNewMessage = (values) => {
    sendMessage(values.newmessagetext);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogList}>{dialogs}</div>

      <div className={s.messageList}>{messages}</div>

      <AddMessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Enter new message..."
          name="newmessagetext"
          component={Textarea}
          validate={[requiredField, maxLength30]}
        />
        {/* <textarea
          ref={newMessageEl}
          onChange={onMessageTextChange}
          value={props.dialogPage.newMessageText}
        ></textarea> */}
      </div>

      <div>
        {/* // onClick={onSendMessage} */}
        <button>Send message</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({ form: "newmessagetext" })(
  AddMessageForm
);

export default Dialogs;
