import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import { loggedInUserInfo, login, reset } from "../../store/slices/authSlice";

const theme = createTheme();

interface ILoginMode {
  setNewUserMode: (val: boolean) => void;
}

const LoginMode = (props: ILoginMode) => {
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
            />
            {isFail && (
              <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {error}
              </Alert>
            )}
            {!isFail && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <i>
              Not member yet? {" "}
              <Link href="#" onClick={() => setNewUserMode(true)}>
                create user
              </Link>
            </i>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginMode;
