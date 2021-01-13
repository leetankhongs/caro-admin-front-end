import React from "react";
import CallAPI from './../utils/CallAPI'
import Authorization from './../utils/callAuth'
import { ACCESS_TOKEN } from '../constant/variables';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: true,
  });

  React.useEffect(() => {
    Authorization('auth/profile', JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
      .then(res => {

        dispatch({ type: 'LOGIN_SUCCESS', id: res.data.id, haha: 'useeffect' })
      })
      .catch(err => { dispatch({ type: "LOGIN_FAILURE" }) })

    return () => {
    }
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
          {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider >
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}


export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, setError, history) {

  if (login && password) {
    CallAPI('auth/login', 'POST', {
      username: login,
      password: password
    }).then(res => {
      localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.data.access_token))
      Authorization('auth/profile', res.data.access_token)
        .then(res => {
          dispatch({ type: 'LOGIN_SUCCESS', id: res.data.id, haha: 'login' })
        })
      history.push('/app/dashboard')
    }).catch(err => setError(true));
  } else {
    setError(true);
    dispatch({ type: "LOGIN_FAILURE" });
  }
}

function signOut(dispatch, history) {
  Authorization('auth/profile', JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
    .then(res => {
      dispatch({ type: 'SIGN_OUT_SUCCESS', id: res.data.id })
      localStorage.removeItem(ACCESS_TOKEN);
    })
  history.push("/login");
}
