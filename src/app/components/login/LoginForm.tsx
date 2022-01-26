import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import { loggedInUserInfo, login, reset } from "../../store/slices/authSlice";
import { Label, FormGroup, P, Form, Icon } from "../styled/LoginForm";
import { Button } from "../styled/Button";
import { Input } from "../styled/Input";
import { Alert } from "../styled/Alert";

interface ILoginForm {
  setNewUserMode: (val: boolean) => void;
}

const LoginForm = (props: ILoginForm) => {
  const { setNewUserMode } = props;

  const { isFail, error } = useAppSelector(loggedInUserInfo);
  const dispatch = useAppDispatch();

  if (isFail) {
    setTimeout(() => {
      dispatch(reset());
    }, 3000);
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
      login({
        username: providedUsername,
        password: providedPassword,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Icon>
          <LockOutlinedIcon />
        </Icon>
        <Label> Sign in</Label>

        <Input id="username" name="username" autoFocus placeholder="Username" />

        <Input id="password" name="password" autoFocus placeholder="Password" />

        {isFail && <Alert>{error}</Alert>}
        {!isFail && (
          <Button type="submit" bg="#e3baf9" color="black">
            Sign In
          </Button>
        )}
        <P>
          <i>Not member yet?</i>{" "}
          <a href="#" onClick={() => setNewUserMode(true)}>
            create user
          </a>
        </P>
      </FormGroup>
    </Form>
  );
};
export default LoginForm;
