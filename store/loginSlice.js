import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
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
} = loginSlice.actions;

// export thunks
export const login = (loginInput) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // perform login request here
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify(loginInput),
    });
    const data = await response.json();

    if (response.ok) {
      // login success
      dispatch(setLoginStatus("success"));
      dispatch(clearForm());
    } else {
      // login failed
      dispatch(setLoginStatus("error"));
      dispatch(setErrors(data.errors));
    }
  } catch (error) {
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
