import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    isLoading: false,
    loginStatus: "",
    errors: [],
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.loginStatus = "";
    },
  },
});

// export actions
export const {
  setEmail,
  setPassword,
  setLoading,
  setLoginStatus,
  setErrors,
  clearForm,
  logout,
} = loginSlice.actions;

// export thunks
export const login = (loginInput) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // perform login request here
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(loginInput);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
      requestOptions
    )
      .then(async (response) => {
        const res = await response.json();
        if (
          res.status === "success" &&
          res.message === "User Logged in successfully"
        ) {
          dispatch(setLoginStatus("success"));
          dispatch(clearForm());
        } else {
          dispatch(setLoginStatus("error"));
        }
      })
      .catch((error) => {
        console.log("error", error);
        // handle error here
        dispatch(setLoginStatus("error"));
        dispatch(
          setErrors(["An error occurred while logging in. Please try again."])
        );
      })
      .finally(() => {
        // dispatch(setLoading(false));
      });

    // login failed due to network error or other errors
    dispatch(setLoginStatus("error"));
    dispatch(
      setErrors(["An error occurred while logging in. Please try again."])
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// export selectors
export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectIsLoading = (state) =>
  state.login ? state.login.isLoading : false;
export const selectLoginStatus = (state) => state.login.loginStatus;
export const selectErrors = (state) => state.login.errors;
export default loginSlice.reducer;
