import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import { loggedInUserInfo, reset } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import LoginNewUser from "./LoginNewUser";

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
    <LoginForm setNewUserMode={setNewUserMode} />
  ) : (
    <LoginNewUser setNewUserMode={setNewUserMode} />
  );
};
export default Login;
