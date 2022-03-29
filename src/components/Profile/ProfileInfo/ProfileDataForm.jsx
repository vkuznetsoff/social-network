import { reduxForm } from "redux-form"
import { Field } from "redux-form"
import { Input } from "../../../utils/validators/formscontrol"
import { maxLength30 } from "../../../utils/validators/validators"
import styles from "./../../../utils/validators/formscontrol.module.css"

export const ProfileDataForm = ({ handleSubmit, profile, error}) => {
//    debugger
//    console.log('1')
//    error && alert(error)
    return (
        <form onSubmit={handleSubmit}>
            
            <button >Сохранить</button>
            {error && <div className={styles.formcontrolcommonerror}>{error}</div>}
            <Field
                placeholder="fullName"
                name="fullName"
                component={Input}
                validate={[maxLength30]}
            />

            <Field
                placeholder="AboutMe"
                name="aboutMe"
                component={Input}
                validate={[maxLength30]}
            />

           
                <Field
                    name="lookingForAJob"
                    id="lookingForAJob"
                    component={Input}
                    type="checkbox"
                />
                 <label for="lookingForAJob">lookingForAJob</label> 
            

            <div>
                <Field
                    name="lookingForAJobDescription"
                    id="lookingForAJobDescription"
                    component={Input}

                />
                <span>lookingForAJobDescription</span>
            </div>

           <div>
               Contacts: {Object.keys(profile.contacts).map( key => {
                   return (
                       <div id={key}>{key}: <Field placeholder={key}
                       name={"contacts."+ key}
                       component={Input} 
                      />
                       </div>  
                   )
               })
            }
           </div>
            {/* <div className={s.descriptionItem}>Contacts: {Object.keys(props.profile.contacts).map(key => {
          return <Contacts contactTitle={key} contactValue={props.profile.contacts[key]} />
        })}
        </div> */}
        </form>
    )
}

export const ProfileDataReduxForm = reduxForm({ form: 'editProfile'})(ProfileDataForm);