
import { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string,
  updateStatus: (status: string) => (dispatch: any) => void
}

type StateType = {
  editMode: boolean,
  status: string
}

const ProfileStatusWithHooks = (PropsType) => {
  
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status)

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

  const onStatusChange = (e) => {
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
