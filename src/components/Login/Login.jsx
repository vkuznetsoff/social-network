import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { login, logout } from "../../redux/auth_reducer";
import { CreateField, Input } from "../../utils/validators/formscontrol";
import { maxLength30, requiredField } from "../../utils/validators/validators";
import styles from "./../../utils/validators/formscontrol.module.css"

const LoginForm = ({handleSubmit, error}) => {
  
  return (
    <form onSubmit={handleSubmit}>
      
      {/* {CreateField("email", "email", [requiredField, maxLength30], Input)} */}
        <Field
          placeholder="email"
          name="email"
          component={Input}
          validate={[requiredField, maxLength30]}
        />
     
      <div>
        <Field
          placeholder="password"
          name="password"
          type={"password"}
          component={Input}
          validate={[requiredField, maxLength30]}
        />
      </div>
      <div>
        <Field
          type="checkbox"
          name="rememberMe"
          component={Input}
          validate={[requiredField, maxLength30]}
        />
      </div>
    
      {error && <div className={styles.formcontrolcommonerror}>{error}</div>}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);

  };

  if (props.isAuth) {
    //console.log('Auth is good') 
    return  <Navigate to={"/profile/22694"} /> 
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    isAuth: state.auth.isAuth
  })


export default connect(mapStateToProps, {login, logout})(Login);
