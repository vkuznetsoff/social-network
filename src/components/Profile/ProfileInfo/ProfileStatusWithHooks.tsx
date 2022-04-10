
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string,
  updateStatus: (status: string) => (dispatch: any) => void
}

// type StateType = {
//   editMode: boolean,
//   status: string
// }

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  
  let [editMode, setEditMode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status)

  useEffect( () => {
    
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status);
  }

  const onStatusChange = (e : ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  return (
    <div>
      {(!editMode) &&
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "---- HOOKS"}
          </span>
        </div>
      }

      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}

    </div>
  );

}

export default ProfileStatusWithHooks;
