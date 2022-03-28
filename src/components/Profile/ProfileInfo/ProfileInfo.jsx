import React from "react";
import { NO_PROFILE_IMAGE } from "../../../img/img";
import Preloader from "../../Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  
  const onChangePhoto = (e) => {
    debugger
    if (e.target.files.lenght) {
      props.savePhoto(e.target.files[0])
    }
  }

  if (!props.profile) {
    return <Preloader />;
  }
  
  return (
    <div>
      {/* <img
        className={s.img}
        src="https://million-wallpapers.ru/wallpapers/0/91/15361566653242396479/kapli-na-zelenoj-poverxnosti.jpg"
      /> */}

      <div className={s.profileDescription}>
        <img src={props.profile.photos.large || NO_PROFILE_IMAGE} />
        { (props.isOwner) && <input type={"file"} onChange={onChangePhoto}/> }

        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
