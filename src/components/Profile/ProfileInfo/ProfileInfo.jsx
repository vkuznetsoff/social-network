import React, { useState } from "react";
import { NO_PROFILE_IMAGE } from "../../../img/img";
import Preloader from "../../Preloader/Preloader";
import { ProfileDataForm, ProfileDataReduxForm } from "./ProfileDataForm";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";

const ProfileInfo = (props) => {

  const [editMode, setEditMode] = useState(false)

  const onChangePhoto = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  if (!props.profile) {
    return <Preloader />;
  }

  const onEditProfile = () =>{
    setEditMode(true)
  }

  const onSubmit = (formData) => {
    
    props.saveProfile(formData, props.profile.userId)
    .then( () => {
      setEditMode(false)
    })
    
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
          {(editMode) ? <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> : <ProfileData profile={props.profile} isOwner={props.isOwner} 
          onEditProfile={onEditProfile} />} 
          

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

const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div>{contactTitle} : {contactValue} </div>
  )
};

const ProfileData = (props) => {

  return (
    <div>

      { props.isOwner ? <button onClick={props.onEditProfile}>Редактировать профиль</button> : undefined }
      <div className={s.descriptionItem}>Full name: {props.profile.fullName}</div>
      <div className={s.descriptionItem}>Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}</div>
      <div className={s.descriptionItem}>Looking for a job description: {props.profile.lookingForAJobDescription}</div>

      <div className={s.descriptionItem}>Contacts: {Object.keys(props.profile.contacts).map(key => {
        return <Contacts contactTitle={key} contactValue={props.profile.contacts[key]} />
      })}
      </div>
    </div>
  )

}


export default ProfileInfo;
