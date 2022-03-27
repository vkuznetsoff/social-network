import { useMatch } from "react-router-dom";

export const withRouter = (Component) => {
  
    let RouterComponent = (props) => { 
      const match = useMatch('/profile/:userID');
      return <Component {...props} match={match} />;
    }
    return RouterComponent;
  }