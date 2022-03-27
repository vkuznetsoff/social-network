import Field from "redux-form/lib/Field";
import styles from "./formscontrol.module.css"

export const Textarea = ({input, meta, ...props}) => {
    //debugger
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formcontrol + " " + (hasError && styles.error)} >
            <textarea {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    //debugger
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formcontrol + " " + (hasError && styles.error)} >
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const CreateField = (placeholder, name, validators, component) => (
    <div> 
        <Field
          placeholder={placeholder}
          name={name}
          component={component}
          validate={validators}
        /> 
    </div>
)