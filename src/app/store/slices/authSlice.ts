import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserAuth {
  username: string;
  password?: string;
}

interface IAuthState {
  users: IUserAuth[];
  logged: boolean;
  loggedUserName: string;
  expirationTime: string;
  isPass: boolean;
  isFail: boolean;
  error: string;
}

const initialAuthState: IAuthState = {
  users: [],
  logged: false,
  loggedUserName: "",
  expirationTime: "0",
  isPass: false,
  isFail: false,
  error: "",
};

const resetState = (state: IAuthState) => {
  state.logged = false;
  state.loggedUserName = "";
  state.expirationTime = "0";
  state.isPass = false;
  state.isFail = false;
  state.error = "";
};

// Check if the user still logged in
const getLoggedInUserInfo = (state: RootState) => {
  const storedExpirationTime = state.auth.expirationTime || "0";
  const loggedUserName = state.auth.loggedUserName || "";

  // 60000 is a minutes in milliseconds --> so if less the 1min we want the user to login again
  if (
    storedExpirationTime !== "0" &&
    +storedExpirationTime - new Date().getTime() < 60000
  ) {
    resetState(state.auth);
  }

  return {
    logged: state.auth.logged,
    name: loggedUserName,
    isPass: state.auth.isPass,
    isFail: state.auth.isFail,
    error: state.auth.error,
  };
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    reset: (state) => {
      state.isPass = false;
      state.isFail = false;
      state.error = "";
    },
    add: (state, action: PayloadAction<IUserAuth>) => {
      if (
        !state.users.find(
          (user) =>
            user.username === action.payload.username &&
            user.password === action.payload.password
        )
      ) {
        state.users.push({
          username: action.payload.username,
          password: action.payload.password,
        });
        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "User already exist";
      }
    },
    login: (state, action: PayloadAction<IUserAuth>) => {
      // Check the user authentication in the storage
      if (
        state.users.find((user) => user.username === action.payload.username)
      ) {
        state.logged = true;
        state.loggedUserName = action.payload.username;
        state.expirationTime = (new Date().getTime() + 3600000).toString();
        state.isPass = true;
      } else {
        state.isFail = true;
        state.error = "User not found";
      }
    },
    logout: (state) => {
      resetState(state);
    },
  },
});

// Export the reducer methods to manipulate the state
export const { reset, add, login, logout } = AuthSlice.actions;

// Export helper methods to get state information
export const loggedInUserInfo = (state: RootState) =>
  getLoggedInUserInfo(state);

export default AuthSlice.reducer;
