import React from "react";
import { NO_PROFILE_IMAGE } from "../../../img/img";
import Preloader from "../../Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

  const onChangePhoto = (e) => {
    debugger
    if (e.target.files.length) {
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
        <span>
          <img src={props.profile.photos.large || NO_PROFILE_IMAGE} />
          <div>
            {(props.isOwner) && <input type={"file"} onChange={onChangePhoto} />}
          </div>
        </span>

        <span className={s.descriptionInfo}>
          <div className={s.descriptionItem}>Full name: </div>
          <div className={s.descriptionItem}>Contacts:</div>
          <div className={s.statusWrapper}>
            <div className={s.profileStatus}>Status:</div>
            <ProfileStatusWithHooks
              status={props.status}
              updateStatus={props.updateStatus}
            />
          </div>




        </span>



      </div>
    </div>
  );
};

export default ProfileInfo;
