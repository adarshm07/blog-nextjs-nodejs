import { useSelector } from "react-redux";
import Login from "@/container/Login";
import { selectLoginStatus } from "@/store/loginSlice";

const AuthWrapper = (Component) => {
  const AuthWrapper = (props) => {
    const loginStatus = useSelector(selectLoginStatus);
    console.log("loginStatus", loginStatus);

    if (loginStatus === "success") {
      return <Component {...props} />;
    } else {
      // Redirect the user to the login page
      return <Login />;
    }
  };

  return AuthWrapper;
};

export default AuthWrapper;
