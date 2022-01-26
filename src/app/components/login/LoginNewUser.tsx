import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import { add, loggedInUserInfo, reset } from "../../store/slices/authSlice";
import { Label, FormGroup, P, Form } from "../styled/LoginForm";
import { Button, IconButton } from "../styled/Button";
import { Input } from "../styled/Input";
import { Alert } from "../styled/Alert";

interface ILoginNewUser {
  setNewUserMode: (val: boolean) => void;
}

const LoginNewUser = (props: ILoginNewUser) => {
  const { setNewUserMode } = props;

  const { isPass, isFail, error } = useAppSelector(loggedInUserInfo);
  const dispatch = useAppDispatch();

  if (isFail) {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
  }
  if (isPass) {
    setNewUserMode(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const providedUsername = new FormData(event.currentTarget)
      .get("username")
      ?.toString();

    const providedPassword = new FormData(event.currentTarget)
      .get("password")
      ?.toString();
    if (!providedUsername || !providedPassword) {
      return;
    }

    // Store the login user information
    dispatch(
      add({
        username: providedUsername,
        password: providedPassword,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <IconButton>
          <LockOutlinedIcon />
        </IconButton>
        <Label> New User</Label>

        <Input id="username" name="username" autoFocus placeholder="New Username" />

        <Input id="password" name="password" autoFocus placeholder="New Password" />

        {isFail && <Alert>{error}</Alert>}
        {!isFail && (
          <Button type="submit" bg="#e3baf9" color="black">
            Create User
          </Button>
        )}
        <P>
          <i>Return to</i>{" "}
          <a href="#" onClick={() => setNewUserMode(false)}>
            login
          </a>
        </P>
      </FormGroup>
    </Form>
  );
};
export default LoginNewUser;
