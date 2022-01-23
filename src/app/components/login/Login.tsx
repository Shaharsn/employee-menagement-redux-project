import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import { loggedInUserInfo, reset } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import LoginMode from "./LoginMode";
import NewUserMode from "./NewUserMode";

const Login = () => {
  const [newUserMode, setNewUserMode] = useState<boolean>(false);

  const loggedInUser = useAppSelector(loggedInUserInfo);
  const dispatch = useAppDispatch();

  // To make sure the form is reset on page refresh
  useEffect(() => {
    dispatch(reset());
  }, []);

  return loggedInUser.logged ? (
    <Navigate replace to="/dashboard" />
  ) : !newUserMode ? (
    <LoginMode setNewUserMode={setNewUserMode} />
  ) : (
    <NewUserMode setNewUserMode={setNewUserMode} />
  );
};
export default Login;
