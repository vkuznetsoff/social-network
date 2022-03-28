
import { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";


const ProfileStatusWithHooks = (props) => {
  
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
