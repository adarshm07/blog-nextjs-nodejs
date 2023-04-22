/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectIsLoading, selectLoginStatus } from "../store/loginSlice";
import Logo from "../public/assets/images/foster-logo.png";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const loginStatus = useSelector((state) => state.login?.loginStatus); // add a check for the existence of the `login` slice
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  };

  useEffect(() => {
    console.log(loginStatus);

    if (loginStatus === "success") {
      router.push("/dashboard");
    }
  }, [isLoading, loginStatus, router]);

  return (
    <div>
      <div id="login" className="login_container">
        <div id="login-box">
          <form
            id="login-form"
            className="form"
            onSubmit={(e) => handleLogin(e)}
            method="post"
          >
            <div className="logo">
              <div className="logo_row">
                <img
                  src={Logo.src}
                  alt={"Logo"}
                  style={{
                    height: "60px",
                  }}
                />
              </div>
            </div>

            <h4 className="text-center login_title">Login</h4>
            {loginStatus === "error" && (
              <div className="alert alert-danger">
                Invalid username or password
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email" className="txt">
                Email Address
              </label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={
                  loginStatus === "error"
                    ? "form-control input-box is-invalid"
                    : "form-control input-box "
                }
                placeholder="Enter email address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="txt">
                Password
              </label>
              <div className="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    loginStatus === "error"
                      ? "form-control input-box is-invalid"
                      : "form-control input-box "
                  }
                  placeholder="Enter password"
                />
                <i className="fa fa-eye-slash passShowHide"></i>
              </div>
            </div>
            <label htmlFor="remember-me" className="remember_me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              &nbsp;
              <span>Remember me</span>
            </label>
            <div id="forgot-password" className="text-right">
              <a href="/forgetPassword">Forgot Password?</a>
            </div>
            <div className="login_btn">
              <button type="submit" className="btn btn-info btn-md n_btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
