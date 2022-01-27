import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/storeHooks";
import { loggedInUserInfo } from "../store/slices/authSlice";

const PrivateRoute = () => {
  const loggedInUser = useAppSelector(loggedInUserInfo);

  console.log('loggedInUser = ' + JSON.stringify(loggedInUser));

  return loggedInUser.logged ? <Outlet /> : <Navigate replace to="/login" />;
};
export default PrivateRoute;
