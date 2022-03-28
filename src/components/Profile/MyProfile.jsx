const MyProfile = (props) => {
    if (props.isAuth) {
        //console.log('Auth is good') 
        return  <Navigate to={"/profile/22694"} /> 
      }
}

